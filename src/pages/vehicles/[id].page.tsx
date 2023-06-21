import { useVehicleDetailsQuery } from '@/store/queries/vehicleApi'
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Tab,
  Typography,
} from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import moment from "moment";
import 'moment/locale/pt-br';
import { TabContext, TabList } from '@mui/lab';
import Link from 'next/link';


export default function VehicleDetails() {
  const router = useRouter()

  const { data, isLoading, error } = useVehicleDetailsQuery(
    router.query.id,
    {
      refetchOnMountOrArgChange: true,
      skip: !router.query.id,
    }
  )


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

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant='h4' color='error'>
          {error?.data?.message}
        </Typography>
      </Box>
    )
  }

  return (
    <>
      <Head>
        <title>Condutores Detalhes</title>
      </Head>
      <Container
        sx={{
          padding: '0 1.25rem 1.25rem',
          gap: '0.5rem',
          margin: '2rem 0 0 0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
          component='section'
        >
          <Card>
            <TabContext value='vehicle-details' >
              <TabList
                variant='scrollable'
                scrollButtons={false}
                sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
              >
                <Tab value='vehicle-details' label='Informações do Veiculo' />
              </TabList>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    ID:
                  </Typography>
                  <Typography variant='body2'>{data?.id}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Placa:
                  </Typography>
                  <Typography variant='body2'>
                    {data?.placa}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Modelo:
                  </Typography>
                  <Typography variant='body2'>
                    {data?.marcaModelo}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Ano:
                  </Typography>
                  <Typography variant='body2'>
                    {data?.anoFabricacao}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    KM Atual
                  </Typography>
                  <Typography variant='body2'>
                    {data?.kmAtual}

                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 2,
                  }}
                >
                  <Button
                    variant='contained'
                    href='/vehicles'
                    LinkComponent={Link}
                  >
                    Voltar
                  </Button>
                </Box>

              </CardContent>
            </TabContext>

          </Card>

        </Box>
      </Container>

    </>
  )
}

