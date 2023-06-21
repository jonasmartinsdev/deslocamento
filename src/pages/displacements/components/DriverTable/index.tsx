import { useEffect, useState } from "react";
import { Box, Button, Chip, CircularProgress, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { DisplacementTableToolbar } from "./DisplacementTableToolbar";
import { DisplacementTableHead } from "./DisplacementTableHead";
import { DisplacementData, } from "@/types";
import { Error, Group } from "@mui/icons-material";
import { useRouter } from "next/router";
import ActionsMenu from "@/components/ActionsMenu";

import Modal from "@/components/Modal";

import { useDeleteDisplacementMutation, useDisplacementListQuery } from "@/store/queries/displacementApi";
import { EditDisplacementForm } from "../Form/EditDisplacementForm";
import { toast } from "react-toastify";
import moment from "moment";
import 'moment/locale/pt-br';



interface IDisplacementFormDelete {
  id: number
}

export function DriverTable() {
  const router = useRouter()
  const [rows, setRows] = useState<readonly DisplacementData[]>([])
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [displacementId, setDisplacementId] = useState<number>()


  const [deleteDisplacement] = useDeleteDisplacementMutation()

  const { data, error, isLoading, refetch } = useDisplacementListQuery({
    refetchOnMountOrArgChange: true,
  })

  const isEmpty: Boolean = data?.length === 0


  const handleDelete = async (data: IDisplacementFormDelete) => {
    if (!confirm('Tem certeza de que deseja excluir?')) {
      return
    }

    const response = await deleteDisplacement(data)

    if (response.error) {
      toast(response.error.data, {
        type: 'error',
      })
    } else {
      toast('Deslocamento deletado com sucesso.', {
        type: 'success',
      })
    }

    refetch()
  }

  function handleEdit(id: number) {
    setDisplacementId(id)
    setOpenModalEdit(true)
  }

  useEffect(() => {
    if (data) {
      setRows(data)
    }
  }, [data])


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
        <DisplacementTableToolbar />

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

              <DisplacementTableHead />

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
                          {row.id}
                        </TableCell>
                        <TableCell
                          component='th'
                          align='left'
                          sx={{
                            pl: '2rem',
                          }}
                        >
                          {moment(new Date(row.inicioDeslocamento)).locale('pt-br').format('LL LTS')}
                        </TableCell>
                        <TableCell component='th' align='left'>

                          {row.fimDeslocamento ?
                            moment(new Date(row.fimDeslocamento)).locale('pt-br').format('LL LTS')
                            : '-'}
                        </TableCell>
                        <TableCell component='th' align='left'>
                          {row.fimDeslocamento ?
                            <Chip label="Finalizado" color="success" />
                            : <Chip label="Iniciado" color="primary" />
                          }

                        </TableCell>

                        <TableCell component='th' align='center'>
                          <ActionsMenu
                            id={row.id}
                            onDelete={() => handleDelete(row)}
                            onEdit={() => handleEdit(row.id)}
                            route='displacements'
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
                        Nenhum deslocamento encontrado
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
        title={"Atualizar Deslocamento"}
        setOpenPopup={setOpenModalEdit}
      >
        <EditDisplacementForm setOpenPopup={setOpenModalEdit} displacementId={displacementId} />
      </Modal>

    </>
  )
}