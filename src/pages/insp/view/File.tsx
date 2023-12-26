import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Topic } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import {
  apiFile,
  fileFindSchema,
  iFileFindRequest,
  useAppThemeContext,
} from '../../../shared'

export const ViewFile = () => {
  const navigate = useNavigate()
  const { unit_id, key } = useParams()
  const { theme, handleError, setLoading } = useAppThemeContext()

  const findFile = (data: iFileFindRequest) => {
    setLoading(true)
    apiFile
      .retrieve(data.ficha)
      .then((res) => navigate(`/insp/${unit_id}/${key}/${res.id}`))
      .catch(() => {
        handleError('Ficha não encotrada')
      })
      .finally(() => setLoading(false))
  }

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
            <Topic />
            Ficha
          </Typography>
        </Box>
        <Divider />
        <Box p={1}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6} lg={4}>
              <FormContainer
                onSuccess={findFile}
                resolver={zodResolver(fileFindSchema)}
              >
                <Box display="flex" gap={1}>
                  <TextFieldElement
                    name="ficha"
                    label="Ficha"
                    required
                    fullWidth
                    type="number"
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    type="submit"
                  >
                    Iniciar
                  </Button>
                </Box>
              </FormContainer>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  )
}
