import { useState, useEffect, useMemo } from 'react'
import { AutocompleteElement, useFormContext } from 'react-hook-form-mui'
import { Grid, Tooltip, IconButton } from '@mui/material'
import { DoneAll } from '@mui/icons-material'
import { iDataBase, iDataBaseSelect, apiDash } from '../../../../shared'

export const ShiftInput = () => {
  const { watch, resetField, setValue } = useFormContext()
  const month: iDataBase = watch('month')
  const unit: iDataBase = watch('unit')
  const sector: iDataBase = watch('sector')
  const initial: string = watch('initial')
  const final: string = watch('final')
  const disabled: boolean = watch('disabled')
  const [shiftsData, setShiftsData] = useState<iDataBaseSelect[]>([])
  const [loading, setLoading] = useState(true)

  const query = useMemo(() => {
    let data = '?by=asc'
    if (month) data += `&month_id=${month.id}`
    if (unit) data += `&unit_id=${unit.id}`
    if (initial) data += `&initial=${initial}`
    if (final) data += `&final=${final}`
    if (sector) data += `&sector_id=${sector.id}`
    return data
  }, [final, initial, month, sector, unit])

  useEffect(() => {
    setLoading(true)
    apiDash
      .shifts(query)
      .then((res) => {
        setShiftsData(
          res.map((el) => {
            return { ...el, label: el.name }
          }),
        )
      })
      .finally(() => setLoading(false))
  }, [query])

  useEffect(() => {
    resetField('shift')
  }, [unit])

  return (
    <>
      <Grid item xs={10}>
        <AutocompleteElement
          name="shift"
          label="Turno"
          loading={loading}
          options={
            shiftsData.length > 0
              ? shiftsData
              : [
                  {
                    id: 1,
                    label:
                      'Nenhum turno encontrado com base nos parâmetros de filtro informados',
                  },
                ]
          }
          autocompleteProps={{ disabled, fullWidth: true }}
        />
      </Grid>
      <Grid item xs={2}>
        <Tooltip title="Todos">
          <IconButton
            color={disabled ? 'success' : undefined}
            onClick={() => {
              resetField('shift')
              setValue('disabled', !disabled)
            }}
          >
            <DoneAll />
          </IconButton>
        </Tooltip>
      </Grid>
    </>
  )
}
