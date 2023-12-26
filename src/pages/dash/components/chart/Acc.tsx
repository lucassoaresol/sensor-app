import { PieChart } from '@mui/x-charts/PieChart'
import { useFormContext } from 'react-hook-form'
import { useEffect, useMemo, useState } from 'react'
import { Grid, Box, Paper, Typography } from '@mui/material'
import { useDrawingArea } from '@mui/x-charts/hooks'
import { styled } from '@mui/material/styles'
import {
  apiDash,
  iAccDashData,
  iChildren,
  iDataBase,
  useAppThemeContext,
} from '../../../../shared'

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}))

const PieCenterLabel = ({ children }: iChildren) => {
  const { width, height, left, top } = useDrawingArea()
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  )
}

export const AccChart = () => {
  const { theme } = useAppThemeContext()
  const { watch } = useFormContext()
  const year: iDataBase = watch('year')
  const month: iDataBase = watch('month')
  const initial: string = watch('initial')
  const final: string = watch('final')
  const unit: iDataBase = watch('unit')
  const sector: iDataBase = watch('sector')
  const shift: iDataBase = watch('shift')
  const [data, setData] = useState<iAccDashData>()

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
    apiDash.acc(query).then((res) => setData(res))
  }, [query])

  return (
    <Grid item xs={12} md={3}>
      <Box component={Paper}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="overline" fontWeight={800} mt={1}>
            Barreira da Qualidade
          </Typography>
          {data && (
            <PieChart
              series={[
                {
                  data: [
                    {
                      value: data.aut,
                      label: 'Auditados',
                      color: theme.palette.success.main,
                    },
                    {
                      value: data.rep,
                      label: 'Reprovados',
                      color: theme.palette.error.main,
                    },
                  ],
                  innerRadius: 60,
                },
              ]}
              height={250}
              slotProps={{ legend: { hidden: true } }}
            >
              <PieCenterLabel>{data.ind}%</PieCenterLabel>
            </PieChart>
          )}
        </Box>
      </Box>
    </Grid>
  )
}
