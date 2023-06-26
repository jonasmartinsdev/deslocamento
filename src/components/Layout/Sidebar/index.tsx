import AddBoxIcon from '@mui/icons-material/AddBox'
import WebIcon from '@mui/icons-material/Web'
import DatasetLinkedTwoToneIcon from '@mui/icons-material/DatasetLinkedTwoTone'
import DeviceHubTwoToneIcon from '@mui/icons-material/DeviceHubTwoTone'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import RecentActorsIcon from '@mui/icons-material/RecentActors'
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import * as React from 'react'
import SidebarItem from './SidebarItem'

const data = [
  {
    icon: <WebIcon />,
    label: 'Portfolio',
    url: 'https://devjonas.vercel.app/',
  },
  {
    icon: <DatasetLinkedTwoToneIcon />,
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jonas-martins-950a30184/',
  },
  {
    icon: <DeviceHubTwoToneIcon />,
    label: 'Github',
    url: 'https://github.com/JonasMartinsDev',
  },
]

const Navbar = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
})

const Sidebar: React.FC = () => {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  return (
    <Box sx={{ display: 'flex' }}>
      <Paper
        elevation={0}
        sx={{ maxWidth: 300, overflow: 'hidden', borderRadius: 0 }}
      >
        <Navbar
          component='nav'
          disablePadding
          sx={{
            width: { sm: 280 },
            flexShrink: { sm: 0 },
            height: '100vh',
          }}
          aria-label='contacts navigation'
        >
          <Box
            component='a'
            onClick={() => router.push('/')}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 2,
              pb: 0.5,
              gap: 0.25,
              background: '#fff',
              width: 'fit-content',
              borderRadius: '1rem',
              margin: '0 auto',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >

            <ListItemText
              primary='App Deslocamento'
              primaryTypographyProps={{
                color: 'action',
                fontWeight: 'bold',
                variant: 'body1',
              }}
            />
          </Box>
          <Divider sx={{ my: 1, margin: '1rem auto' }} />
          <List
            sx={{
              px: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <SidebarItem
              text="Clientes"
              path='/'
              icon={
                <RecentActorsIcon
                  sx={{
                    color: router.pathname === '/' ? '#1B59F8' : '',
                  }}
                />
              }
            />
            <SidebarItem
              text='Condutores'
              path='/drivers'
              icon={
                <AddBoxIcon
                  sx={{
                    color: router.pathname === '/drivers' ? '#1B59F8' : '',
                  }}
                />
              }
            />
            <SidebarItem
              text='Deslocamentos'
              path='/displacements'
              icon={
                <AddBoxIcon
                  sx={{
                    color: router.pathname === '/displacements' ? '#1B59F8' : '',
                  }}
                />
              }
            />
            <SidebarItem
              text='Veículos'
              path='/vehicles'
              icon={
                <AddBoxIcon
                  sx={{
                    color: router.pathname === '/vehicles' ? '#1B59F8' : '',
                  }}
                />
              }
            />
          </List>
          <Divider />
          <Box
            sx={{
              bgcolor: open ? '#fff' : null,
              pb: open ? 2 : 0,
            }}
          >
            <ListItemButton
              alignItems='flex-start'
              onClick={() => setOpen(!open)}
              sx={{
                px: 3,
                pt: 2.5,
                pb: 2.5,
                '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0.5 } },
              }}
            >
              <ListItemText
                primary={`Desenvolvedor`}
                primaryTypographyProps={{
                  fontSize: 15,
                  lineHeight: '20px',
                  mb: '2px',
                  fontWeight: 'bold',
                  color: open ? '#1B59F8' : 'text.disabled',
                }}
                secondary='Portfolio,Github, LinkedIn'
                secondaryTypographyProps={{
                  noWrap: true,
                  fontSize: 12,
                  lineHeight: '16px',
                  color: open ? 'text.primary' : 'text.disabled',
                }}
                sx={{ my: 0 }}
              />
              <KeyboardArrowDown
                sx={{
                  mr: -1,
                  opacity: 0.2,
                  transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                  transition: '0.2s',
                }}
              />
            </ListItemButton>
            {open &&
              data.map((item) => (
                <ListItemButton
                  key={item.label}
                  sx={{ py: 1, minHeight: 32, color: '#222' }}
                  onClick={() => window.open(item.url, '_blank')}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: 'semibold',
                    }}
                  />
                </ListItemButton>
              ))}
          </Box>
        </Navbar>
      </Paper>
    </Box>
  )
}

export default Sidebar
