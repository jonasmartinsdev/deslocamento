import Box from '@mui/material/Box'
import { ClientsTable } from './components/ClientsTable'

export default function Clients() {
  return (
    <Box sx={{ width: '100%' }} component='section'>
      <ClientsTable />
    </Box>
  )
}

