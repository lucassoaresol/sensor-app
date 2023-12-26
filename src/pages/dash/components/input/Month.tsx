import { useState, useEffect, useMemo } from 'react'
import { AutocompleteElement, useFormContext } from 'react-hook-form-mui'
import { iDataBaseSelect, apiDash, iDataBase } from '../../../../shared'

export const MonthInput = () => {
  const { watch } = useFormContext()
  const year: iDataBase = watch('year')
  const [monthsData, setMonthsData] = useState<iDataBaseSelect[]>([])
  const [loading, setLoading] = useState(true)

  const query = useMemo(() => {
    if (year) return `?year_id=${year.id}`

    return ''
  }, [year])

  useEffect(() => {
    setLoading(true)
    apiDash
      .months(query)
      .then((res) => {
        setMonthsData(
          res.map((el) => {
            return { ...el, label: el.name }
          }),
        )
      })
      .finally(() => setLoading(false))
  }, [query])

  return (
    <AutocompleteElement
      name="month"
      label="Mês"
      loading={loading}
      options={
        monthsData.length > 0
          ? monthsData
          : [
              {
                id: 1,
                label: 'No momento, não há nenhum mês cadastrado',
              },
            ]
      }
      textFieldProps={{ fullWidth: true }}
    />
  )
}
