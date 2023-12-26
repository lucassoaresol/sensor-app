import { useState, useEffect } from 'react'
import { AutocompleteElement } from 'react-hook-form-mui'
import { iDataBaseSelect, apiDash } from '../../../../shared'

export const YearInput = () => {
  const [yearsData, setYearsData] = useState<iDataBaseSelect[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    apiDash
      .years()
      .then((res) => {
        setYearsData(
          res.map((el) => {
            return { ...el, name: el.year, label: el.year }
          }),
        )
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <AutocompleteElement
      name="year"
      label="Ano"
      loading={loading}
      options={
        yearsData.length > 0
          ? yearsData
          : [
              {
                id: 1,
                label: 'No momento, não há nenhum ano cadastrado',
              },
            ]
      }
      textFieldProps={{ fullWidth: true }}
    />
  )
}
