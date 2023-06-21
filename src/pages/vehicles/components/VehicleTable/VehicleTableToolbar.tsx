import { Box, Button, InputAdornment, TextField, Toolbar, Typography } from "@mui/material";
import { Search, AddCircleOutline } from '@mui/icons-material'
import { debounce } from "lodash";
import { useState } from "react";
import Modal from "@/components/Modal";
import { CreateVehicleForm } from "../Form/CreateVehicleForm";


interface VehicleTableToolbarProps {
  onSearch: (search: string) => void
}

export function VehicleTableToolbar({ onSearch }: VehicleTableToolbarProps) {
  const [openModal, setIsOpenModal] = useState(false);

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value)
  }, 500)

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
            Veículos
          </Typography>
        </Box>


        <Box
          sx={{
            display: 'flex',
            gap: { xs: 1, sm: 2 },
            width: '100%',
            flex: '1 1 40%',
          }}
        >
          <TextField
            id='search'
            label='Search'
            variant='outlined'
            size='small'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search color='primary' />
                </InputAdornment>
              ),
              placeholder: 'ex: Gol',
            }}
            sx={{ width: '100%', maxWith: '400px', background: '#fff' }}
            onChange={handleSearch}
          />

          <Button
            aria-label='Novo Cliente'
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
            title='Novo Veículos'
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
              Novo Veículos
            </Typography>
          </Button>
        </Box>
      </Toolbar>

      <Modal
        openPopup={openModal}
        title="Cadastrar Veículos"
        setOpenPopup={setIsOpenModal}
      >

        <CreateVehicleForm setOpenPopup={setIsOpenModal} />
      </Modal>

    </>

  )
}