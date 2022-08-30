import React from 'react'

import { Button, Flex, Icon, Input, Text, useClipboard } from '@chakra-ui/react'
import { BsWhatsapp } from 'react-icons/bs'
import { MdContentCopy } from 'react-icons/md'
import { TbCheck } from 'react-icons/tb'
import { FindTeamQuery, GetGhostPlayersForTeamQuery } from 'types/graphql'

import { useCreateGhostPlayerInvitation } from '../hooks/useCreateGhostPlayerInvitation'

import DeleteplayerGhostInvitationDialog from './DeleteplayerGhostInvitationDialog'

type GhostPlayerUniqueInviteProps = {
  team?: FindTeamQuery['team']
  ghost: GetGhostPlayersForTeamQuery['getGhostPlayersByTeamId'][0]
}

const GhostPlayerUniqueInvite = ({
  ghost,
  team,
}: GhostPlayerUniqueInviteProps) => {
  const { handleCreateInvitation, loading } = useCreateGhostPlayerInvitation()
  const hasGhostInvitation = !!ghost?.ghostInvitation

  const inviteUrl = `${process.env.FRONTEND_URL}/app/team/join?invitationToken=${team?.invitationToken}&ghostInvitation=${ghost?.ghostInvitation}`

  const { hasCopied, onCopy } = useClipboard(inviteUrl)

  return (
    <Flex my={4} w={{ base: 'full' }}>
      <Text
        minW="180px"
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
        fontWeight="bold"
      >
        {ghost.displayName}
      </Text>
      <Input
        title={
          hasGhostInvitation
            ? inviteUrl
            : 'Geen uitnoding aanwezig op het moment'
        }
        value={
          hasGhostInvitation
            ? inviteUrl
            : 'Geen uitnoding aanwezig op het moment'
        }
        isReadOnly
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
        maxW="50%"
        isDisabled={!hasGhostInvitation}
      />
      {hasGhostInvitation ? (
        <>
          <Button onClick={onCopy} ml={4} color="white">
            {hasCopied ? (
              <Icon as={TbCheck} color="white" />
            ) : (
              <Icon as={MdContentCopy} color="white" />
            )}
          </Button>
          <Button
            mx={4}
            as="a"
            target="_blank"
            href={`https://api.whatsapp.com/send?text=TeamStats:+Je+ben+uitgenodigd+om+een+team+te+joinen.+Bekijk+nu+je+uitnodiging:+${encodeURI(
              inviteUrl
            )}`}
            colorScheme="whatsapp"
          >
            <Icon as={BsWhatsapp} />
          </Button>
          <DeleteplayerGhostInvitationDialog ghost={ghost} />
        </>
      ) : (
        <Button
          ml={4}
          isLoading={loading}
          onClick={() => handleCreateInvitation(ghost.id || '')}
        >
          Maak uitnodiging
        </Button>
      )}
    </Flex>
  )
}

export default GhostPlayerUniqueInvite