export const schema = gql`
  type Training {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    date: DateTime!
    season: Season
    seasonId: String
    players: [Player]!
    scores: [Score]!
    team: Team
    teamId: String
  }

  type Query {
    trainings: [Training!]! @requireAuth
    training(id: String!): Training! @requireAuth
    trainingByTeamId(id: String!): [Training]! @requireAuth
    getRecentTrainings(playerId: String!, limit: Int!): [Training!]!
      @requireAuth
  }

  input CreateTrainingInput {
    date: DateTime!
    seasonId: String!
    teamId: String!
  }

  input UpdateTrainingInput {
    date: DateTime
    seasonId: String!
    teamId: String!
  }

  type Mutation {
    createTraining(
      input: CreateTrainingInput!
      scores: [CreateScoreInput]!
    ): Training! @requireAuth @isTeamOwner
    updateTraining(
      id: String!
      input: UpdateTrainingInput!
      scores: [CreateScoreInput]!
    ): Training! @requireAuth @isTeamOwner
    deleteTraining(id: String!): Training! @requireAuth @isTeamOwner
  }
`;
