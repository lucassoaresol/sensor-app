import { useState, useEffect, useMemo } from 'react'
import { AutocompleteElement, useFormContext } from 'react-hook-form-mui'
import { iDataBaseSelect, apiDash, iDataBase } from '../../../../shared'

export const UnitInput = () => {
  const { watch } = useFormContext()
  const month: iDataBase = watch('month')
  const initial: string = watch('initial')
  const final: string = watch('final')
  const [unitData, setUnitData] = useState<iDataBaseSelect[]>([])
  const [loading, setLoading] = useState(true)

  const query = useMemo(() => {
    let data = '?by=asc'
    if (month) data += `&month_id=${month.id}`
    if (initial) data += `&initial=${initial}`
    if (final) data += `&final=${final}`
    return data
  }, [month, initial, final])

  useEffect(() => {
    setLoading(true)
    apiDash
      .units(query)
      .then((res) => {
        setUnitData(
          res.map((el) => {
            return { ...el, label: el.name }
          }),
        )
      })
      .finally(() => setLoading(false))
  }, [query])

  return (
    <AutocompleteElement
      name="unit"
      label="Unidade"
      loading={loading}
      options={
        unitData.length > 0
          ? unitData
          : [
              {
                id: 1,
                label:
                  'Nenhuma unidade encontrado com base nos parâmetros de filtro informados',
              },
            ]
      }
      textFieldProps={{ fullWidth: true }}
    />
  )
}
