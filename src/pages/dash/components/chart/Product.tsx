import { useFormContext } from 'react-hook-form'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { Grid, Box, Paper, Typography, styled } from '@mui/material'
import {
  BarPlot,
  ChartsXAxis,
  ChartsYAxis,
  ResponsiveChartContainer,
  useDrawingArea,
  useXScale,
  useYScale,
} from '@mui/x-charts'
import { ScaleLinear, ScalePoint } from 'd3'
import { apiDash, iDataBase, useAppThemeContext } from '../../../../shared'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

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

export const ProductChart = () => {
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
    apiDash.products(query).then((res) => {
      setXNData(res.num.map((el) => el.x))
      setXPData(res.prc.map((el) => el.x))
      setYNData(res.num.map((el) => el.y))
      setYPData(res.prc.map((el) => el.y))
    })
  }, [query])

  const DrawingAreaBox = () => {
    const { left, top, width, height } = useDrawingArea()

    const yAxisScale = useYScale() as ScaleLinear<any, any>
    const xAxisScale = useXScale() as ScalePoint<string>

    return is_perc ? (
      <>
        <StyledPath
          d={`M ${left} ${top} l ${width} 0 l 0 ${height} l -${width} 0 Z`}
        />
        {yPData.map((el, index) => (
          <Fragment key={index}>
            <StyledText
              x={
                Number(xAxisScale(xPData[index])) + width / yNData.length / 2.25
              }
              y={yAxisScale(el)}
              textAnchor="middle"
              dominantBaseline="text-after-edge"
            >
              {el}%
            </StyledText>
          </Fragment>
        ))}
      </>
    ) : (
      <>
        <StyledPath
          d={`M ${left} ${top} l ${width} 0 l 0 ${height} l -${width} 0 Z`}
        />
        {yNData.map((el, index) => (
          <Fragment key={index}>
            <StyledText
              x={Number(xAxisScale(xNData[index])) + width / yNData.length / 2}
              y={yAxisScale(el)}
              textAnchor="end"
              dominantBaseline="text-after-edge"
            >
              {el}
            </StyledText>
          </Fragment>
        ))}
      </>
    )
  }

  return (
    <Grid item xs={12} md={6}>
      <Box component={Paper}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="overline" fontWeight={800} mt={1}>
            Top 5 Produtos
          </Typography>
          {is_perc
            ? xPData.length > 0 &&
              yPData.length > 0 && (
                <ResponsiveChartContainer
                  xAxis={[{ scaleType: 'band', data: xPData }]}
                  series={[
                    {
                      type: 'bar',
                      data: yPData,
                      color: theme.palette.secondary.main,
                    },
                  ]}
                  height={250}
                >
                  <BarPlot />
                  <ChartsXAxis />
                  <ChartsYAxis />
                  <DrawingAreaBox />
                </ResponsiveChartContainer>
              )
            : xNData.length > 0 &&
              yNData.length > 0 && (
                <ResponsiveChartContainer
                  xAxis={[{ scaleType: 'band', data: xNData }]}
                  series={[
                    {
                      type: 'bar',
                      data: yNData,
                      color: theme.palette.secondary.main,
                    },
                  ]}
                  height={250}
                >
                  <BarPlot />
                  <ChartsXAxis />
                  <ChartsYAxis />
                  <DrawingAreaBox />
                </ResponsiveChartContainer>
              )}
        </Box>
      </Box>
    </Grid>
  )
}
