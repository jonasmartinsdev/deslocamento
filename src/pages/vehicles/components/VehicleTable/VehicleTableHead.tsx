import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

export interface IOptions {
  [key: string]: string
}

export interface Data {
  id: string
  plate: string
  model: string
  year: string
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
    id: 'plate',
    numeric: false,
    disablePadding: false,
    label: 'Placa',
  },
  {
    id: 'model',
    numeric: false,
    disablePadding: false,
    label: 'Modelo',
  },
  {
    id: 'year',
    numeric: false,
    disablePadding: false,
    label: 'Ano',
  },

  {
    id: 'options',
    numeric: false,
    disablePadding: true,
    label: 'Ações',
  },
]


export function VehicleTableHead() {
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