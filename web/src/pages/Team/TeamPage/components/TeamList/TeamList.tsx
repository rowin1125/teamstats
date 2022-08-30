import React from 'react'

import {
  Heading,
  Flex,
  Button,
  Icon,
  Text,
  UseDisclosureProps,
} from '@chakra-ui/react'
import { BiUserPlus } from 'react-icons/bi'
import { FindTeamQuery } from 'types/graphql'

import Card from 'src/components/Card/Card'
import TeamTable from 'src/components/TeamTable'

import { useGetPlayersForTeam } from '../../hooks/useGetPlayersForTeam'

type TeamListProps = {
  team: FindTeamQuery['team']
  setCurrentTabIndex: (index: number) => void
  disclosure: UseDisclosureProps
}

const TeamList = ({ team, setCurrentTabIndex, disclosure }: TeamListProps) => {
  const { playersData } = useGetPlayersForTeam()

  return (
    <Card w="100%" bg="primary.500" color="white">
      {playersData?.playersForTeam?.length > 0 ? (
        <>
          <Heading color="white">Punten in team: {team?.name}</Heading>
          <TeamTable
            entries={playersData?.playersForTeam.map((player, index) => {
              const topTree = {
                1: '🏆️',
                2: '🥈',
                3: '🥉',
              }
              const medal = topTree[index + 1]
              const position = medal ? `${medal} ${index + 1}` : ` ${index + 1}`
              return {
                positie: position,
                avatar: player?.user?.avatar,
                displayName: player.displayName,
                points: Math.floor(Math.random() * 100),
              }
            })}
          />
        </>
      ) : (
        <>
          <Heading color="white">Je hebt nog geen teamleden</Heading>
          <Text my={4}>
            Begin met het samenstellen van je team doormiddel van spelers uit te
            nodigen
          </Text>
          <Flex my={10} justifyContent="center">
            <Button
              onClick={() => {
                setCurrentTabIndex(1)
                disclosure.onOpen()
              }}
              variant="ghost"
              h="400px"
              w="400px"
              borderColor="secondary.500"
              borderStyle="dashed"
              borderWidth="1px"
              justifyContent="center"
              alignItems="center"
              transition="all 0.3s ease"
              _hover={{
                bg: 'primary.600',
              }}
              _active={{
                bg: 'primary.800',
              }}
            >
              <Icon as={BiUserPlus} fontSize="150px" color="secondary.500" />
            </Button>
          </Flex>
        </>
      )}
    </Card>
  )
}

export default TeamList