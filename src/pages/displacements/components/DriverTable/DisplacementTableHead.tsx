import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

export interface IOptions {
  [key: string]: string
}

export interface Data {
  id: string
  start: string
  end: string
  status: string
  options: IOptions
}

export interface IHeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

const headCells: readonly IHeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'start',
    numeric: false,
    disablePadding: false,
    label: 'Inicio deslocamento',
  },
  {
    id: 'end',
    numeric: false,
    disablePadding: false,
    label: 'Fim deslocamento',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'options',
    numeric: false,
    disablePadding: true,
    label: 'Ações',
  },
]


export function DisplacementTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, idx) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sx={{
              pl: idx === 0 ? '2rem' : '1rem',
            }}
          >
            <TableSortLabel
            >
              {headCell.label}

            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}