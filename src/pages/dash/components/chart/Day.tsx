import { useFormContext } from 'react-hook-form'
import { useEffect, useMemo, useState } from 'react'
import { Grid, Box, Paper, Typography } from '@mui/material'
import { LineChart } from '@mui/x-charts'
import { apiDash, iDataBase, useAppThemeContext } from '../../../../shared'

export const DayChart = () => {
  const { theme } = useAppThemeContext()
  const { watch } = useFormContext()
  const year: iDataBase = watch('year')
  const month: iDataBase = watch('month')
  const initial: string = watch('initial')
  const final: string = watch('final')
  const unit: iDataBase = watch('unit')
  const sector: iDataBase = watch('sector')
  const shift: iDataBase = watch('shift')
  const is_perc: boolean = watch('is_perc')
  const [xNData, setXNData] = useState<string[]>([])
  const [xPData, setXPData] = useState<string[]>([])
  const [yNData, setYNData] = useState<number[]>([])
  const [yPData, setYPData] = useState<number[]>([])

  const query = useMemo(() => {
    let data = '?by=asc'
    if (year) data += `&year_id=${year.id}`
    if (month) data += `&month_id=${month.id}`
    if (initial) data += `&initial=${initial}`
    if (final) data += `&final=${final}`
    if (unit) data += `&unit_id=${unit.id}`
    if (sector) data += `&sector_id=${sector.id}`
    if (shift) data += `&shift=${shift.id}`
    return data
  }, [final, initial, month, sector, shift, unit, year])

  useEffect(() => {
    apiDash.days(query).then((res) => {
      setXNData(res.num.map((el) => el.x))
      setXPData(res.prc.map((el) => el.x))
      setYNData(res.num.map((el) => el.y))
      setYPData(res.prc.map((el) => el.y))
    })
  }, [query])

  return (
    <Grid item xs={12} md={9}>
      <Box component={Paper}>
        <Typography
          variant="overline"
          textAlign="center"
          component="div"
          fontWeight={800}
        >
          Problemas
        </Typography>
        {is_perc
          ? xPData.length > 0 &&
            yPData.length > 0 && (
              <LineChart
                series={[
                  {
                    data: yPData,
                    color: theme.palette.secondary.main,
                  },
                ]}
                xAxis={[{ scaleType: 'point', data: xPData }]}
                height={250}
              />
            )
          : xNData.length > 0 &&
            yNData.length > 0 && (
              <LineChart
                series={[
                  {
                    data: yNData,
                    color: theme.palette.secondary.main,
                  },
                ]}
                xAxis={[{ scaleType: 'point', data: xNData }]}
                height={250}
              />
            )}
      </Box>
    </Grid>
  )
}
