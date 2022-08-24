import React from 'react'

import { Column, useSortBy, useTable } from 'react-table'

import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText'

export type TableEntriesType = Record<string, unknown>[] | undefined
export type UseTableReturnType = Record<string, unknown>

export const useSortableTable = (
  entries: TableEntriesType,
  hiddenColumns: string[]
) => {
  const rawColumns: Record<'Header' | 'accessor', string>[] = []

  for (const dataRow of entries || []) {
    const keys = Object.keys(dataRow)
    keys.forEach((key) => {
      if (hiddenColumns?.includes(key)) return
      if (rawColumns.find((header) => header.accessor === key)) return
      if (key === '__typename') return

      rawColumns.push({
        Header: capitalizeText(key),
        accessor: key,
      })
    })
  }

  const data = React.useMemo(() => entries || [], [entries])
  const columns = React.useMemo(
    () => rawColumns,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [entries]
  ) as Column<UseTableReturnType>[]

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<UseTableReturnType>({ columns, data }, useSortBy)

  return {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  }
}
