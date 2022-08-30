/* eslint-disable react/jsx-key */
import React from 'react'

import { Box, Icon, Th, Thead, Tr } from '@chakra-ui/react'
import { CgChevronDown, CgChevronUp } from 'react-icons/cg'
import { HeaderGroup } from 'react-table'

import { UseTeamTableReturnType } from '../hooks/useTeamTable'

type TeamTableProps = {
  headerGroups: HeaderGroup<UseTeamTableReturnType>[]
  theme: 'dark' | 'light'
}

const TeamTable = ({ headerGroups, theme }: TeamTableProps) => (
  <Thead>
    {headerGroups.map((headerGroup) => (
      <Tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => (
          <Th
            {...column.getHeaderProps(column.getSortByToggleProps())}
            fontWeight="bold"
            fontSize="lg"
            textTransform="none"
            color={theme === 'dark' ? 'white' : 'primary.500'}
          >
            <Box as="span" display="flex">
              {column.render('Header')}
              {column.isSorted ? (
                column.isSortedDesc ? (
                  <Icon as={CgChevronDown} fontSize="md" ml={2} />
                ) : (
                  <Icon as={CgChevronUp} fontSize="md" ml={2} />
                )
              ) : null}
            </Box>
          </Th>
        ))}
      </Tr>
    ))}
  </Thead>
)

export default TeamTable
