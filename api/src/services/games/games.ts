import type {
  QueryResolvers,
  MutationResolvers,
  GameResolvers,
  CreateScoreInput,
} from 'types/graphql'

import { UserInputError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const games: QueryResolvers['games'] = () => {
  return db.game.findMany()
}

export const game: QueryResolvers['game'] = async ({ id }) => {
  const game = await db.game.findUnique({
    where: { id },
  })

  return game
}

export const gamesByTeamId: QueryResolvers['gamesByTeamId'] = ({ id }) => {
  return db.game.findMany({
    where: {
      teamId: id,
    },
    orderBy: {
      gameDate: 'desc',
    },
  })
}

export const createGame: MutationResolvers['createGame'] = async ({
  input,
  scores,
}) => {
  try {
    const gameResult = await db.game.create({
      data: {
        ...input,
        players: {
          connect: scores.map((score) => ({
            id: score.playerId,
          })),
        },
      },
    })

    const scoreData: CreateScoreInput[] = scores.map((score) => ({
      ...score,
      gameId: gameResult.id,
    }))

    await db.score.createMany({
      data: scoreData,
    })

    return gameResult
  } catch (error) {
    throw new UserInputError('Failed to upload')
  }
}

export const updateGame: MutationResolvers['updateGame'] = async ({
  id,
  input,
  scores,
}) => {
  const team = await db.team.findUnique({
    where: { id: input.teamId },
  })

  if (!team) throw new UserInputError('Team niet gevonden')
  if (team.ownerId !== context.currentUser.id)
    throw new UserInputError('Niet toegestaan, je bent geen team owner')

  try {
    const gameResult = await db.game.update({
      where: { id },
      data: {
        ...input,
        scores: {
          deleteMany: {},
        },
      },
    })

    const scoreData: CreateScoreInput[] = scores.map((score) => ({
      ...score,
      gameId: gameResult.id,
    }))

    await db.score.createMany({
      data: scoreData,
    })

    return gameResult
  } catch (error) {
    throw new UserInputError('Failed to upload')
  }
}

export const deleteGame: MutationResolvers['deleteGame'] = ({ id }) => {
  return db.game.delete({
    where: { id },
  })
}

export const Game: GameResolvers = {
  season: (_obj, { root }) =>
    db.game.findUnique({ where: { id: root.id } }).season(),
  players: (_obj, { root }) =>
    db.game.findUnique({ where: { id: root.id } }).players(),
  scores: (_obj, { root }) =>
    db.game.findUnique({ where: { id: root.id } }).scores(),
  team: (_obj, { root }) =>
    db.game.findUnique({ where: { id: root.id } }).team(),
}