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
import { TabContext, TabList } from '@mui/lab';
import Link from 'next/link';


export default function DriverDetails() {
  const router = useRouter()

  const { data, isLoading, error } = useDriverDetailsQuery(
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
        <title>Veiculo Detalhes</title>
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
            <TabContext value='client-details' >
              <TabList
                variant='scrollable'
                scrollButtons={false}
                sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
              >
                <Tab value='client-details' label='Informações do Condutor' />
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
                    Nome:
                  </Typography>
                  <Typography variant='body2'>{data?.nome}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Numero da habilitação:
                  </Typography>
                  <Typography variant='body2'>{data?.numeroHabilitacao}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Categoria da habilitação:
                  </Typography>
                  <Typography variant='body2'>{data?.catergoriaHabilitacao}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Vencimento da habilitação:
                  </Typography>
                  <Typography variant='body2'>
                    {moment(new Date(data?.vencimentoHabilitacao)).locale('pt-br').format('LL')}
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
                    href='/drivers'
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

