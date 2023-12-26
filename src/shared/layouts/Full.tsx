import { Box, Container, Grid } from '@mui/material'
import {
  iChildren,
  useAppThemeContext,
  Header,
  Footer,
  useAuthContext,
} from '../../shared'
import { useMemo } from 'react'

export const LayoutFullBasePage = ({ children }: iChildren) => {
  const { theme, mdDown } = useAppThemeContext()
  const { userProfile } = useAuthContext()

  const isHome = useMemo(() => {
    return userProfile?.role === 'MANAGER'
  }, [userProfile])

  return (
    <Box display="flex" flexDirection="column">
      <Header isHome={isHome} />
      <Box mt={theme.spacing(7)}>
        <Container>
          <Grid
            container
            direction={mdDown ? 'column' : 'row'}
            spacing={mdDown ? 2 : 5}
          >
            {children}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}
