import {
  Box,
  Container,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material'
import { Home, Logout } from '@mui/icons-material'
import { FormContainer } from 'react-hook-form-mui'
import { LayoutDrawerTemporaryBasePage, useAuthContext } from '../../shared'
import {
  AccChart,
  DayChart,
  ErrChart,
  ErrYearChart,
  LineChart,
  MenuDrawer,
  ProductChart,
} from './components'

export const DashPage = () => {
  const { logout } = useAuthContext()

  return (
    <FormContainer defaultValues={{ disabled: true }}>
      <LayoutDrawerTemporaryBasePage
        drawer={<MenuDrawer />}
        title={
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="overline" fontSize={13}>
              Painel da Qualidade
            </Typography>
            <Box display="flex" gap={0.5}>
              <Tooltip title="Início">
                <IconButton href="/">
                  <Home />
                </IconButton>
              </Tooltip>
              <Tooltip title="Sair">
                <IconButton onClick={logout}>
                  <Logout />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        }
      >
        <Container>
          <Grid container spacing={1}>
            <DayChart />
            <AccChart />
            <LineChart />
            <ProductChart />
            <ErrChart />
            <ErrYearChart />
          </Grid>
        </Container>
      </LayoutDrawerTemporaryBasePage>
    </FormContainer>
  )
}
