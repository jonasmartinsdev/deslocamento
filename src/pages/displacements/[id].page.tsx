import { useDriverDetailsQuery } from '@/store/queries/driverApi'
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
import { useDisplacementDetailsQuery } from '@/store/queries/displacementApi';
import { useClientDetailsQuery } from '@/store/queries/clientApi';
import { TabContext, TabList } from '@mui/lab';
import { useVehicleDetailsQuery } from '@/store/queries/vehicleApi';
import Link from 'next/link';


export default function DisplacementDetails() {
  const router = useRouter()

  const { data, isLoading, error } = useDisplacementDetailsQuery(
    router.query.id,
    {
      refetchOnMountOrArgChange: true,
      skip: !router.query.id,
    }
  )


  const { data: client } = useClientDetailsQuery(
    data?.idCliente,
    {
      refetchOnMountOrArgChange: true,
      skip: !data?.idCliente,
    }
  )

  const { data: driver, } = useDriverDetailsQuery(
    data?.idCondutor,
    {
      refetchOnMountOrArgChange: true,
      skip: !data?.idCondutor,
    }
  )


  const { data: vehicle, } = useVehicleDetailsQuery(
    data?.idVeiculo,
    {
      refetchOnMountOrArgChange: true,
      skip: !data?.idVeiculo,
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
        <title>Descolamento Detalhes</title>
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
            <TabContext value='displacement-details' >
              <TabList
                variant='scrollable'
                scrollButtons={false}
                sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
              >
                <Tab value='displacement-details' label='Informações do Deslocamento' />
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
                    Condutor:
                  </Typography>
                  <Typography variant='body2'>
                    {driver?.nome}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Cliente:
                  </Typography>
                  <Typography variant='body2'>{client?.nome}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Veiculo:
                  </Typography>
                  <Typography variant='body2'>{vehicle?.marcaModelo}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Inicio deslocamento:
                  </Typography>
                  <Typography variant='body2'>

                    {moment(new Date(data?.inicioDeslocamento)).locale('pt-br').format('LL LTS')}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    KM inical:
                  </Typography>
                  <Typography variant='body2'>
                    {data?.kmInicial}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Fim deslocamento:
                  </Typography>
                  <Typography variant='body2'>
                    {moment(new Date(data?.fimDeslocamento)).locale('pt-br').format('LL LTS')}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    KM final:
                  </Typography>
                  <Typography variant='body2'>
                    {data?.kmFinal}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Check List:
                  </Typography>
                  <Typography variant='body2'>
                    {data?.checkList}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Observação:
                  </Typography>
                  <Typography variant='body2'>
                    {data?.observacao}
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
                    href='/displacements'
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

