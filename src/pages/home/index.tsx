import { useEffect, useState } from 'react'
import {
  LayoutFullBasePage,
  apiDump,
  iDump,
  useAppThemeContext,
} from '../../shared'
import { Box, Button, Grid, Paper } from '@mui/material'
import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
} from 'react-hook-form-mui'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {
  const navigate = useNavigate()
  const { setLoading } = useAppThemeContext()
  const [dumps, setDumps] = useState<iDump[]>([])

  useEffect(() => {
    setLoading(true)
    apiDump
      .list('')
      .then((res) => setDumps(res))
      .finally(() => setLoading(false))
  }, [])

  return (
    <LayoutFullBasePage>
      <Box width="100%" display="flex" justifyContent="center">
        <Paper>
          <Grid container p={2} direction="column" spacing={2}>
            <Grid item>
              <FormContainer
                onSuccess={(data) =>
                  navigate(`/map/${data.dump.lat}/${data.dump.lon}`)
                }
              >
                <Grid item container alignItems="center" spacing={1}>
                  <Grid item xs={10}>
                    <AutocompleteElement
                      options={dumps.sort(
                        (a, b) => -b.sector.localeCompare(a.sector),
                      )}
                      autocompleteProps={{
                        groupBy: (option) => option.sector,
                        fullWidth: true,
                      }}
                      name="dump"
                      label="Lixeira"
                      required
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button fullWidth type="submit">
                      Simular
                    </Button>
                  </Grid>
                </Grid>
              </FormContainer>
            </Grid>
            <Grid item>
              <FormContainer
                onSuccess={(data) => navigate(`/map/${data.lat}/${data.long}`)}
              >
                <Grid item container alignItems="center" spacing={1}>
                  <Grid item xs={5}>
                    <TextFieldElement label="Latitude" name="lat" required />
                  </Grid>
                  <Grid item xs={5}>
                    <TextFieldElement label="Longitude" name="long" required />
                  </Grid>
                  <Grid item xs={2}>
                    <Button fullWidth type="submit">
                      Simular
                    </Button>
                  </Grid>
                </Grid>
              </FormContainer>
            </Grid>
            <Grid item textAlign="center">
              <Button variant="contained" onClick={() => navigate('/map')}>
                Usar Localização Atual
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </LayoutFullBasePage>
  )
}
