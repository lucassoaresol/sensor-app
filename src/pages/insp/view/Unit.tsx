import {
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { Factory } from '@mui/icons-material'
import {
  apiUnit,
  iDataBase,
  useAppThemeContext,
  usePaginationContext,
} from '../../../shared'

export const ViewUnit = () => {
  const { theme } = useAppThemeContext()
  const { setCount } = usePaginationContext()
  const [loading, setLoading] = useState(false)
  const [unitsData, setUnitsData] = useState<iDataBase[]>()

  const getUnits = useCallback(() => {
    setLoading(true)
    apiUnit
      .list()
      .then((res) => {
        setUnitsData(res.result)
        setCount(res.total)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => getUnits(), [])

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
            <Factory />
            Unidade
          </Typography>
        </Box>
        <Divider />
        <Box p={1}>
          <Grid container spacing={2}>
            {loading ? (
              <Grid item xs={12}>
                <LinearProgress variant="indeterminate" />
              </Grid>
            ) : unitsData && unitsData.length > 0 ? (
              unitsData.map((el) => (
                <Grid key={el.id} item xs={12} sm={6} md={4}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    size="large"
                    href={`/insp/${el.id}`}
                  >
                    {el.name}
                  </Button>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  Nenhuma unidade encotrada
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Grid>
  )
}
