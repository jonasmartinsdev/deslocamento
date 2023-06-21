import { useClientDetailsQuery } from '@/store/queries/clientApi'
import { TabContext, TabList } from '@mui/lab'
import {
  Avatar,
  Box,

  Button,

  Card,

  CardContent,

  CircularProgress,
  Container,
  Divider,
  Grid,
  Modal,
  Tab,
  Typography,
} from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ClientDetails() {
  const router = useRouter()

  const { data, isLoading, error } = useClientDetailsQuery(
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
        <title>Cliente Detalhes</title>
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
          <Box
            sx={{
              display: { xs: 'block', sm: 'flex', md: 'flex' },
              justifyContent: 'start',
              gap: '2rem',
              alignItems: 'start',
              backgroundColor: 'background.paper',
              padding: '1rem',
              borderRadius: '0.75rem',
              maxWidth: '500px',
              position: 'relative',
            }}
            component='section'
          >
            <Avatar
              sx={{
                width: { xs: '50px', sm: '80px', md: '100px' },
                height: { xs: '50px', sm: '80px', md: '100px' },
                fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3rem' },
                mb: { xs: '1rem', sm: '0', md: '0' },
              }}
            >
              {data?.nome[0]}
            </Avatar>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}
              component='section'
            >
              <Typography variant='h6' color='inherit'>
                <strong>
                  {data?.nome}
                </strong>
              </Typography>
              <Box>
                <Typography
                  variant='body1'
                  color='inherit'
                  fontWeight={500}
                  mb={0.5}
                >
                  {data?.cidade} - {data?.uf}
                </Typography>
                <Typography variant='body2' color='inherit'>
                  {data?.numero} - {data?.logradouro}
                </Typography>
              </Box>
            </Box>
          </Box>


          <Card>
            <TabContext value='client-details' >
              <TabList
                variant='scrollable'
                scrollButtons={false}
                sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
              >
                <Tab value='client-details' label='Informações gerais' />
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
                    Cidade:
                  </Typography>
                  <Typography variant='body2'>{data?.cidade}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Tipo de Documento:
                  </Typography>
                  <Typography variant='body2'>{data?.tipoDocumento}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Documento:
                  </Typography>
                  <Typography variant='body2'>{data?.numeroDocumento}</Typography>
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
                    href='/'
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

