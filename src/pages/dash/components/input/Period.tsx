import { useFormContext } from 'react-hook-form-mui'
import { Box } from '@mui/material'
import { Date } from './Date'
import { MonthInput } from './Month'
import { useEffect } from 'react'
import { iDataBase } from '../../../../shared'

export const PeriodInput = () => {
  const { watch, resetField } = useFormContext()
  const year: iDataBase = watch('year')
  const month: iDataBase = watch('month')
  const initial: string = watch('initial')
  const final: string = watch('final')
  const isPeriod: boolean = watch('is_period')

  useEffect(() => {
    resetField('unit')
    resetField('sector')
  }, [month, initial, final])

  useEffect(() => {
    resetField('initial')
    resetField('final')
    resetField('month')
  }, [isPeriod, year])

  return isPeriod ? (
    <Box display="flex" flexDirection="column" gap={1.5}>
      <Date name="initial" label="Início" />
      <Date name="final" label="Fim" />
    </Box>
  ) : (
    <MonthInput />
  )
}
