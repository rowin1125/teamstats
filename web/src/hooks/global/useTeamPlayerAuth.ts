import { useAuth } from '@redwoodjs/auth'

export const useTeamPlayerAuth = () => {
  const { currentUser } = useAuth()
  const isTeamStaff = currentUser?.player?.playerType === 'STAFF'
  const isTeamPlayer = currentUser?.player?.playerType === 'PLAYER'

  return { currentUser, isTeamStaff, isTeamPlayer }
}
