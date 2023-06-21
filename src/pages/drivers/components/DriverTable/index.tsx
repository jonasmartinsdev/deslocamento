import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { DriverTableToolbar } from "./DriverTableToolbar";
import { DriverTableHead } from "./DriverTableHead";
import { DriverData } from "@/types";
import { Error, Group } from "@mui/icons-material";
import { useRouter } from "next/router";
import ActionsMenu from "@/components/ActionsMenu";
import { EditDriverForm } from "../Form/EditDriverForm";
import Modal from "@/components/Modal";
import { useDeleteDriverMutation, useDriverListQuery } from "@/store/queries/driverApi";
import moment from "moment";
import 'moment/locale/pt-br';
import { toast } from "react-toastify";



interface IDriverFormDelete {
  id: number
}

export function DriverTable() {
  const router = useRouter()
  const [rows, setRows] = useState<readonly DriverData[]>([])
  const [search, setSearch] = useState<string>('')
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [driverId, setDriver] = useState<number>()

  const [deleteDriver] = useDeleteDriverMutation()

  const { data, error, isLoading, refetch } = useDriverListQuery({
    refetchOnMountOrArgChange: true,
  })


  const isEmpty: Boolean = data?.length === 0

  const handleOnSearch = (search: string) => {
    setSearch(search)
  }

  const handleDelete = async (data: IDriverFormDelete) => {
    if (!confirm('Tem certeza de que deseja excluir?')) {
      return
    }

    const response = await deleteDriver(data)

    toast('Condutor deletado com sucesso.', {
      type: 'success',
    })

    refetch()
  }

  function handleEdit(id: number) {
    setDriver(id)
    setOpenModalEdit(true)
  }

  useEffect(() => {
    if (search.trim() === '') {
      if (data) {
        setRows(data)
      }
    } else {
      const filterByName = data.filter((item: { nome: string; }) => item.nome.toLowerCase().includes(search.toLowerCase()))

      setRows(filterByName)
    }
  }, [data, search])


  if (error) {
    return (
      <Box
        sx={{
          width: '100%',
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh',
        }}
      >
        <Error
          sx={{ fontSize: 100, color: 'grey.500', marginBottom: '20px' }}
        />
        <Typography variant='h6' component='div' gutterBottom fontWeight='bold'>
          Algo deu errado, tente novamente mais tarde
        </Typography>
        <Button
          variant='text'
          color='info'
          size='large'
          sx={{
            marginTop: '',
            fontWeight: 'bold',
            textTransform: 'capitalize',
            fontSize: '1.15rem',
          }}
          onClick={() => router.reload()}
        >
          Reload
        </Button>
      </Box>
    )
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ width: '100%', maxWidth: '72rem', pt: { md: 2 } }}>
        <DriverTableToolbar onSearch={handleOnSearch} />

        <Divider sx={{ marginBottom: '1rem' }} />

        <Paper
          sx={{
            width: '100%',
            mb: 2,
            borderRadius: '1rem',
            height: '100%',
          }}
        >
          <TableContainer sx={{
            maxHeight: {
              xs: 'calc(100vh - 250px)',
              md: 'calc(100vh - 200px)',
            },
          }}>
            <Table
              stickyHeader
              aria-labelledby='tableTitle'
              size={'medium'}
              sx={{ position: 'relative' }}
            >

              <DriverTableHead />

              <TableBody>
                {!isEmpty ? (
                  rows.map((row, idx) => {
                    return (
                      <TableRow
                        role='row'
                        key={row.id}
                        hover
                        sx={{
                          cursor: 'pointer',
                          '&:last-child td, &:last-child th': {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell
                          component='th'
                          align='left'
                          sx={{
                            pl: '2rem',
                          }}
                        >
                          {row.nome}
                        </TableCell>
                        <TableCell component='th' align='left'>
                          {row.numeroHabilitacao}
                        </TableCell>
                        <TableCell component='th' align='left'>
                          {row.catergoriaHabilitacao}
                        </TableCell>
                        <TableCell component='th' align='left'>
                          {moment(new Date(row.vencimentoHabilitacao)).locale('pt-br').format('LL')}
                        </TableCell>
                        <TableCell component='th' align='center'>
                          <ActionsMenu
                            id={row.id}
                            onDelete={() => handleDelete(row)}
                            onEdit={() => handleEdit(row.id)}
                            route='drivers'
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align='center' sx={{ py: 3 }}>
                      <Group sx={{ fontSize: 100, color: 'grey.500' }} />
                      <Typography
                        variant='h6'
                        component='div'
                        gutterBottom
                        fontWeight='bold'
                      >
                        Nenhum condutor encontrado
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>

            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <Modal
        openPopup={openModalEdit}
        title={"Edital Condutor"}
        setOpenPopup={setOpenModalEdit}
      >
        <EditDriverForm setOpenPopup={setOpenModalEdit} driverId={driverId} />
      </Modal>

    </>
  )
}