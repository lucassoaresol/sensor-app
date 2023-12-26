import { useFormContext } from 'react-hook-form'
import { useEffect, useMemo, useState } from 'react'
import { LineChart } from '@mui/x-charts/LineChart'
import { Grid, Box, Paper, Typography } from '@mui/material'
import { apiDash, iDataBase, useAppThemeContext } from '../../../../shared'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

export const ErrYearChart = () => {
  const { theme } = useAppThemeContext()
  const { watch } = useFormContext()
  const unit: iDataBase = watch('unit')
  const sector: iDataBase = watch('sector')
  const shift: iDataBase = watch('shift')
  const is_perc: boolean = watch('is_perc')
  const [xNData, setXNData] = useState<string[]>([])
  const [xPData, setXPData] = useState<string[]>([])
  const [yNData, setYNData] = useState<number[]>([])
  const [yPData, setYPData] = useState<number[]>([])

  const query = useMemo(() => {
    let data = `?initial=${dayjs()
      .subtract(1, 'year')
      .format('DD/MM/YYYY')}&final=${dayjs().format('DD/MM/YYYY')}`
    if (unit) data += `&unit_id=${unit.id}`
    if (sector) data += `&sector_id=${sector.id}`
    if (shift) data += `&shift=${shift.id}`
    return data
  }, [sector, shift, unit])

  useEffect(() => {
    apiDash.errYear(query).then((res) => {
      setXNData(res.num.map((el) => el.x))
      setXPData(res.prc.map((el) => el.x))
      setYNData(res.num.map((el) => el.y))
      setYPData(res.prc.map((el) => el.y))
    })
  }, [query])

  return (
    <Grid item xs={12} mb={2}>
      <Box component={Paper}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="overline" fontWeight={800} mt={1}>
            Histórico de Problemas
          </Typography>
          {is_perc
            ? xPData.length > 0 &&
              yPData.length > 0 && (
                <LineChart
                  height={250}
                  series={[
                    { data: yPData, color: theme.palette.secondary.main },
                  ]}
                  xAxis={[{ scaleType: 'point', data: xPData }]}
                />
              )
            : xNData.length > 0 &&
              yNData.length > 0 && (
                <LineChart
                  height={250}
                  series={[
                    {
                      data: yNData,
                      color: theme.palette.secondary.main,
                    },
                  ]}
                  xAxis={[
                    {
                      scaleType: 'point',
                      data: xNData,
                    },
                  ]}
                />
              )}
        </Box>
      </Box>
    </Grid>
  )
}
