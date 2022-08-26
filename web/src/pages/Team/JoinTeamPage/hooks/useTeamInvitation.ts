import {
  UpdatePlayerMutation,
  UpdatePlayerMutationVariables,
} from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { PLAYER_FRAGMENT } from 'src/graphql/fragments/PlayerFragment'

const UPDATE_PLAYER_MUTATION = gql`
  ${PLAYER_FRAGMENT}
  mutation UpdatePlayerMutation($id: String!, $input: UpdatePlayerInput!) {
    updatePlayer(id: $id, input: $input) {
      ...PlayerFragment
    }
  }
`

export const useTeamInvitation = () => {
  const { reauthenticate } = useAuth()

  const [updatePlayer, { loading }] = useMutation<
    UpdatePlayerMutation,
    UpdatePlayerMutationVariables
  >(UPDATE_PLAYER_MUTATION, {
    onCompleted: reauthenticate,
  })

  const handleJoinTeam = async (playerId: string, teamId: string) => {
    try {
      await updatePlayer({
        variables: {
          id: playerId,
          input: {
            teamId: teamId,
            teamInvitation: null,
            isActivePlayer: true,
          },
        },
      })
      toast.success('Gefeliciteerd, je bent onderdeel van het team')
      navigate(routes.team())
    } catch (error) {
      console.error(error)
      toast.error('Oeps er is iets fout gegaan 😢')
    }
  }

  const handleDeleteTeamInvitation = async (playerId: string) => {
    try {
      await updatePlayer({
        variables: {
          id: playerId,
          input: {
            teamInvitation: null,
          },
        },
      })
      toast.success('De uitnodiging is verwijderd 🗑️')
      navigate(routes.app())
    } catch (error) {
      console.error(error)
      toast.error('Oeps er is iets fout gegaan 😢')
    }
  }

  return { handleJoinTeam, handleDeleteTeamInvitation, loading }
}
