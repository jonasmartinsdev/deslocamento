import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

export interface IOptions {
  [key: string]: string
}

export interface Data {
  id: string
  name: string
  driving: string
  category: string
  invoice: string
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
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nome',
  },
  {
    id: 'driving',
    numeric: false,
    disablePadding: false,
    label: 'Habilitação',
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Categoria',
  },
  {
    id: 'invoice',
    numeric: false,
    disablePadding: false,
    label: 'Vencimento',
  },
  {
    id: 'options',
    numeric: false,
    disablePadding: true,
    label: 'Ações',
  },
]


export function DriverTableHead() {
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