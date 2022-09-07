import { Grid, GridItem, Heading } from '@chakra-ui/react'
import { format } from 'date-fns'

import { MetaTags } from '@redwoodjs/web'

import Card from 'src/components/Card/Card'
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById'

import TrainingForm from '../form/TrainingForm'

import { useGetTrainingById } from './hooks/useGetTrainingById'
import { useUpdateTrainingById } from './hooks/useUpdateTrainingById'

const UpdateTrainingPage = () => {
  const { training, trainingLoading } = useGetTrainingById()
  const { team, loading } = useGetTeamById()
  const { handleUpdateTraining, updateTrainingLoading } = useUpdateTrainingById(
    training?.id
  )

  if (trainingLoading || loading) return null

  const regularScores = training?.scores.filter(
    (score) => score.type === 'TRAINING'
  )
  const topTrainingScores = training?.scores.filter(
    (score) => score.type === 'TOP_TRAINING'
  )

  return (
    <>
      <MetaTags
        title="Update training"
        description="Wijzig de gegevens van een training"
      />

      <Grid templateColumns="repeat(3, 1fr)" gap={{ xl: 10 }}>
        <GridItem colSpan={{ base: 3, md: 3, '2xl': 2 }}>
          <Card position="relative">
            <Heading>Update training ⚽️🏃</Heading>

            <TrainingForm
              initialValues={{
                trainingsDate: format(
                  new Date(training.trainingsDate),
                  'yyyy-MM-dd'
                ),
                seasonId: training?.season.id,
                teamId: training?.teamId,
                scores: regularScores.map((score) => ({
                  playerId: score.player.id,
                  seasonId: training.season.id,
                  points: score.points,
                  teamId: team?.id,
                  trainingId: '',
                  type: 'TRAINING',
                })),
                topTrainingScores: topTrainingScores.map((score) => ({
                  playerId: score.player.id,
                  seasonId: training.season.id,
                  points: score.points,
                  teamId: team?.id,
                  trainingId: '',
                  type: 'TOP_TRAINING',
                })),
              }}
              type="new"
              onSubmit={handleUpdateTraining}
              loading={trainingLoading || updateTrainingLoading}
              team={team}
              players={training?.players}
            />
          </Card>
        </GridItem>
      </Grid>
    </>
  )
}

export default UpdateTrainingPage
