import { useFormContext } from 'react-hook-form'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { Grid, Box, Paper, styled, Typography } from '@mui/material'
import { ScaleLinear, ScalePoint } from 'd3'
import {
  ChartsXAxis,
  LinePlot,
  ResponsiveChartContainer,
  useDrawingArea,
  useXScale,
  useYScale,
} from '@mui/x-charts'
import {
  apiDash,
  iDashData,
  iDataBase,
  useAppThemeContext,
} from '../../../../shared'

const StyledPath = styled('path')(() => ({
  fill: 'none',
  shapeRendering: 'crispEdges',
  strokeWidth: 1,
  pointerEvents: 'none',
}))

const StyledText = styled('text')(({ theme }) => ({
  stroke: 'none',
  fill: theme.palette.text.primary,
  shapeRendering: 'crispEdges',
  textTransform: 'uppercase',
  lineHeight: 2.66,
  fontWeight: 800,
  fontSize: '0.75rem',
  letterSpacing: '0.08333em',
}))

export const DayLabelChart = () => {
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
  const [nData, setNData] = useState<iDashData[]>([])
  const [pData, setPData] = useState<iDashData[]>([])
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
      setNData(res.num)
      setPData(res.prc)
      setXNData(res.num.map((el) => el.x))
      setXPData(res.prc.map((el) => el.x))
      setYNData(res.num.map((el) => el.y))
      setYPData(res.prc.map((el) => el.y))
    })
  }, [query])

  const num = nData.filter((el) => el.y > 0)
  const prc = pData.filter((el) => el.y > 0)

  const DrawingAreaBox = () => {
    const { left, top, width, height } = useDrawingArea()

    const yAxisScale = useYScale() as ScaleLinear<any, any>
    const xAxisScale = useXScale() as ScalePoint<string>

    return is_perc ? (
      <>
        <StyledPath
          d={`M ${left} ${top} l ${width} 0 l 0 ${height} l -${width} 0 Z`}
        />
        {prc.map((el, index) => (
          <Fragment key={index}>
            <StyledText
              x={xAxisScale(el.x)}
              y={yAxisScale(el.y)}
              textAnchor="end"
              dominantBaseline="text-after-edge"
            >
              {el.x.substring(0, 2)} , {el.y}%
            </StyledText>
            <circle cx={xAxisScale(el.x)} cy={yAxisScale(el.y)} r={2} />
          </Fragment>
        ))}
      </>
    ) : (
      <>
        <StyledPath
          d={`M ${left} ${top} l ${width} 0 l 0 ${height} l -${width} 0 Z`}
        />
        {num.map((el, index) => (
          <Fragment key={index}>
            <StyledText
              x={xAxisScale(el.x)}
              y={yAxisScale(el.y)}
              textAnchor="end"
              dominantBaseline="text-after-edge"
            >
              {el.x.substring(0, 2)} , {el.y}
            </StyledText>
            <circle cx={xAxisScale(el.x)} cy={yAxisScale(el.y)} r={2} />
          </Fragment>
        ))}
      </>
    )
  }

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
              <ResponsiveChartContainer
                series={[
                  {
                    type: 'line',
                    data: yPData,
                    color: theme.palette.secondary.main,
                  },
                ]}
                xAxis={[{ scaleType: 'point', data: xPData }]}
                height={250}
              >
                <LinePlot />
                <ChartsXAxis />
                <DrawingAreaBox />
              </ResponsiveChartContainer>
            )
          : xNData.length > 0 &&
            yNData.length > 0 && (
              <ResponsiveChartContainer
                series={[
                  {
                    type: 'line',
                    data: yNData,
                    color: theme.palette.secondary.main,
                  },
                ]}
                xAxis={[{ scaleType: 'point', data: xNData }]}
                height={250}
              >
                <LinePlot />
                <ChartsXAxis />
                <DrawingAreaBox />
              </ResponsiveChartContainer>
            )}
      </Box>
    </Grid>
  )
}
