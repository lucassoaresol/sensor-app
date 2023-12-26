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
import { CorporateFare } from '@mui/icons-material'
import {
  apiUnit,
  iSectorUnit,
  useAppThemeContext,
  usePaginationContext,
} from '../../../shared'

interface iViewSectorProps {
  unit_id: string
}

export const ViewSector = ({ unit_id }: iViewSectorProps) => {
  const { theme } = useAppThemeContext()
  const { setCount } = usePaginationContext()
  const [loading, setLoading] = useState(false)
  const [sectorsData, setSectorsData] = useState<iSectorUnit[]>()

  const getSectors = useCallback(() => {
    setLoading(true)
    apiUnit
      .listSectors(unit_id)
      .then((res) => {
        setSectorsData(res.result)
        setCount(res.total)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => getSectors(), [])

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
            <CorporateFare />
            Setor
          </Typography>
        </Box>
        <Divider />
        <Box p={1}>
          <Grid container spacing={2}>
            {loading ? (
              <Grid item xs={12}>
                <LinearProgress variant="indeterminate" />
              </Grid>
            ) : sectorsData && sectorsData.length > 0 ? (
              sectorsData.map((el) => (
                <Grid key={el.key} item xs={12} sm={6} md={4}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    size="large"
                    href={`/insp/${unit_id}/${el.key}`}
                  >
                    {el.sector.name}
                  </Button>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  Nenhum setor encotrada
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Grid>
  )
}
