import { useState, useEffect, useMemo } from 'react'
import { AutocompleteElement, useFormContext } from 'react-hook-form-mui'
import { iDataBase, iDataBaseSelect, apiDash } from '../../../../shared'

export const SectorInput = () => {
  const { watch, resetField } = useFormContext()
  const month: iDataBase = watch('month')
  const unit: iDataBase = watch('unit')
  const initial: string = watch('initial')
  const final: string = watch('final')
  const [sectorsData, setSectorsData] = useState<iDataBaseSelect[]>([])
  const [loading, setLoading] = useState(true)

  const query = useMemo(() => {
    let data = '?by=asc'
    if (month) data += `&month_id=${month.id}`
    if (unit) data += `&unit_id=${unit.id}`
    if (initial) data += `&initial=${initial}`
    if (final) data += `&final=${final}`
    return data
  }, [final, initial, month, unit])

  useEffect(() => {
    setLoading(true)
    apiDash
      .sectors(query)
      .then((res) => {
        setSectorsData(
          res.map((el) => {
            return { ...el, label: el.name }
          }),
        )
      })
      .finally(() => setLoading(false))
  }, [query])

  useEffect(() => {
    resetField('sector')
  }, [unit])

  return (
    <AutocompleteElement
      name="sector"
      label="Setor"
      loading={loading}
      options={
        sectorsData.length > 0
          ? sectorsData
          : [
              {
                id: 1,
                label:
                  'Nenhum setor encontrado com base nos parâmetros de filtro informados',
              },
            ]
      }
      textFieldProps={{ fullWidth: true }}
    />
  )
}
