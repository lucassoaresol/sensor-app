import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material'
import { Monitor } from '@mui/icons-material'
import { useAppThemeContext } from '../../../shared'

export const ViewMode = () => {
  const { theme } = useAppThemeContext()

  return (
    <Grid item xs={12} md={9}>
      <Box component={Paper}>
        <Box
          height={theme.spacing(7)}
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={1}
        >
          <Typography
            component="div"
            variant="h6"
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Monitor />
            Tela
          </Typography>
        </Box>
        <Divider />
        <Box p={1}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                size="large"
                href="/insp"
              >
                Inspeções
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                size="large"
                href="/dash"
              >
                Dashboard
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  )
}
