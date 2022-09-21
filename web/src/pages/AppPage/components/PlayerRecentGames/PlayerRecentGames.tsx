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

import { useGetRecentGamePoints } from './hooks/useGetRecentGamePoints'

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

const PlayerRecentGames = () => {
  const { recentGames, loading } = useGetRecentGamePoints()
  const { currentUser } = useAuth()
  const { isXl } = useScreenSize()

  if (loading) return null
  const labels = recentGames.map((game) =>
    format(new Date(game.gameDate), 'dd/MM')
  )

  const data = {
    labels,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Jouw score',
        backgroundColor: 'rgb(75, 192, 192)',
        data: recentGames.map((game) => {
          const totalPointsOfCurrentPlayer = game.scores.reduce(
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
        data: recentGames.map((game) => {
          const averageGameScore =
            game.scores
              .map((score) => score.points)
              .reduce((a, b) => a + b, 0) / game.scores.length

          return averageGameScore
        }),
      },
    ],
  }

  return (
    <Card bg="primary.500" color="white">
      <Heading color="white" mb={8}>
        Recente punten wedstrijden
      </Heading>
      <ChartHasDataWrapper
        entries={recentGames}
        isLoading={loading}
        to={routes.newGame({
          id: currentUser?.player.teamId,
        })}
        title="Geen gegevens gevonden"
        buttonText="Maak je eerste wedstrijd aan"
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

export default PlayerRecentGames