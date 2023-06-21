import { useEffect, useState } from "react";
import { Box, Button, Card, CircularProgress, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { ClientTableToolbar } from "./ClientTableToolbar";
import { ClientTableHead } from "./ClientTableHead";
import { useClientListQuery, useDeleteClientMutation } from "@/store/queries/clientApi";
import { ClientData } from "@/types";
import { Error, Group } from "@mui/icons-material";
import { useRouter } from "next/router";
import ActionsMenu from "@/components/ActionsMenu";
import { EditClientForm } from "../Form/EditClientForm";
import Modal from "@/components/Modal";
import { toast } from "react-toastify";


interface IClientFormDelete {
  id: number
}

export function ClientsTable() {
  const router = useRouter()
  const [rows, setRows] = useState<readonly ClientData[]>([])
  const [search, setSearch] = useState<string>('')
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [clientId, setClientId] = useState<number>()

  const [deleteClient] = useDeleteClientMutation()

  const { data, error, isLoading, refetch } = useClientListQuery({
    refetchOnMountOrArgChange: true,
  })

  const isEmpty: Boolean = data?.length === 0

  const handleOnSearch = (search: string) => {
    setSearch(search)
  }
  const handleDelete = async (data: IClientFormDelete) => {
    if (!confirm('Tem certeza de que deseja excluir?')) {
      return
    }

    const response = await deleteClient(data)

    toast('Cliente deletado com sucesso.', {
      type: 'success',
    })

    refetch()
  }

  function handleEdit(id: number) {
    setClientId(id)
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
        <ClientTableToolbar onSearch={handleOnSearch} />

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

              <ClientTableHead />

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
                          {row.cidade}
                        </TableCell>
                        <TableCell component='th' align='left'>
                          {row.tipoDocumento}
                        </TableCell>
                        <TableCell component='th' align='left'>
                          {row.uf}
                        </TableCell>
                        <TableCell component='th' align='center'>
                          <ActionsMenu
                            id={row.id}
                            onDelete={() => handleDelete(row)}
                            onEdit={() => handleEdit(row.id)}
                            route='clients'
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
                        Nenhum cliente encontrado
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
        title={"Edital Cliente"}
        setOpenPopup={setOpenModalEdit}
      >
        <EditClientForm setOpenPopup={setOpenModalEdit} clientId={clientId} />
      </Modal>

    </>
  )
}