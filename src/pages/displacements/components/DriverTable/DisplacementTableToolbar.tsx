import { Box, Button, Toolbar, Typography } from "@mui/material";
import { AddCircleOutline } from '@mui/icons-material'
import { useState } from "react";
import Modal from "@/components/Modal";
import { CreateDisplacementForm } from "../Form/CreateDisplacementForm";




export function DisplacementTableToolbar() {
  const [openModal, setIsOpenModal] = useState(false);



  return (
    <>
      <Toolbar
        sx={{
          mt: 2,
          mb: { xs: 3, md: 1 },
          gap: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          minHeight: { xs: 'auto', md: '50px' },
        }}

      >
        <Box sx={{ display: 'flex', flex: '1', alignItems: 'center' }}>

          <Typography
            id='tableTitle'
            component='h1'
            fontWeight={700}
            sx={{
              fontSize: { xs: '1.5rem', md: '1.75rem' },
              color: 'primary.primary',
              display: { xs: 'none', md: 'block' },
            }}
          >
            Deslocamentos
          </Typography>
        </Box>


        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: { xs: 1, sm: 2 },
            width: '100%',
            flex: '1 1 40%',
          }}
        >


          <Button
            aria-label='Novo Deslocamento'
            sx={{
              background: '#fff',
              maxWidth: 'fit-content',
              py: 0.85,
              display: 'flex',
              gap: 1,

              borderRadius: '0.30rem',
              border: '1px solid #ccc',
              '&:hover': {
                background: '#fff',
                border: '1px solid #222',
              },
            }}
            title='Novo Deslocamento'
            onClick={() => setIsOpenModal(true)}
            variant='outlined'
            fullWidth
          >
            <AddCircleOutline color='primary' />
            <Typography
              variant='body2'
              fontWeight={600}
              sx={{ display: { xs: 'none', lg: 'block' } }}
            >
              Novo Deslocamento
            </Typography>
          </Button>
        </Box>
      </Toolbar>

      <Modal
        openPopup={openModal}
        title="Cadastrar Deslocamento"
        setOpenPopup={setIsOpenModal}
      >

        <CreateDisplacementForm setOpenPopup={setIsOpenModal} />
      </Modal>

    </>

  )
}