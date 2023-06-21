import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

export interface IOptions {
  [key: string]: string
}

export interface Data {
  id: string
  name: string
  city: string
  documentType: string
  uf: string
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
    id: 'city',
    numeric: false,
    disablePadding: false,
    label: 'Cidade',
  },
  {
    id: 'documentType',
    numeric: false,
    disablePadding: false,
    label: 'Documento',
  },
  {
    id: 'uf',
    numeric: false,
    disablePadding: false,
    label: 'Estado',
  },
  {
    id: 'options',
    numeric: false,
    disablePadding: true,
    label: 'Ações',
  },
]


export function ClientTableHead() {
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