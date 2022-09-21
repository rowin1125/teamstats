import React from 'react'

import { Heading } from '@chakra-ui/react'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js'
import { format } from 'date-fns'
import { Chart } from 'react-chartjs-2'

import { useAuth } from '@redwoodjs/auth'
import { routes } from '@redwoodjs/router'

import Card from 'src/components/Card/Card'
import ChartHasDataWrapper from 'src/components/ValidationWrappers/ChartHasDataWrapper/ChartHasDataWrapper'
import { useScreenSize } from 'src/hooks/global/useScreenSize'

import { useGetRecentTrainingPoints } from './hooks/useGetRecentTrainingPoints'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
)

const PlayerRecentTrainings = () => {
  const { recentTrainings, loading } = useGetRecentTrainingPoints()
  const { currentUser } = useAuth()
  const { isXl } = useScreenSize()

  if (loading) return null
  const labels = recentTrainings.map((training) =>
    format(new Date(training.trainingsDate), 'dd/MM')
  )

  const data = {
    labels,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Jouw score',
        backgroundColor: 'rgb(75, 192, 192)',
        data: recentTrainings.map((training) => {
          const totalPointsOfCurrentPlayer = training.scores.reduce(
            (acc, score) => {
              if (score.playerId === currentUser?.player?.id)
                return acc + score.points

              return acc
            },
            0
          )
          return totalPointsOfCurrentPlayer
        }),
        borderColor: 'white',
        borderWidth: 2,
      },
      {
        type: 'bar' as const,
        label: 'Gemiddelde score van de groep',
        backgroundColor: 'rgb(53, 162, 235)',
        data: recentTrainings.map((training) => {
          const averageTrainingScore =
            training.scores
              .map((score) => score.points)
              .reduce((a, b) => a + b, 0) / training.scores.length

          return averageTrainingScore
        }),
      },
    ],
  }

  return (
    <Card bg="primary.500" color="white">
      <Heading color="white" mb={8}>
        Recente punten trainingen
      </Heading>
      <ChartHasDataWrapper
        entries={recentTrainings}
        isLoading={loading}
        to={routes.newTraining({
          id: currentUser?.player.teamId,
        })}
        title="Geen gegevens gevonden"
        buttonText="Maak je eerste training aan"
      >
        <Chart
          height={isXl ? 100 : 200}
          type="bar"
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
                labels: {
                  font: {
                    size: 14,
                  },
                  color: 'white',
                },
              },
            },
            color: 'white',
            scales: {
              x: {
                ticks: {
                  color: 'white',
                },
              },
              y: {
                ticks: {
                  color: 'white',
                },
              },
            },
          }}
          data={data}
        />
      </ChartHasDataWrapper>
    </Card>
  )
}

export default PlayerRecentTrainings