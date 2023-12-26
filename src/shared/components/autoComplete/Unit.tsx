import { useState, useEffect } from 'react'
import { AutocompleteElement } from 'react-hook-form-mui'
import { iDataBaseSelect } from '../../interfaces'
import { apiUnit } from '../../services'

export const AutoCompleteUnit = () => {
  const [unitData, setUnitData] = useState<iDataBaseSelect[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    apiUnit
      .list()
      .then((res) => {
        setUnitData(
          res.result.map((el) => {
            return { ...el, label: el.name }
          }),
        )
      })
      .finally(() => setLoading(false))
  }, [])

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
                label: 'No momento, não há nenhuma unidade cadastrada',
              },
            ]
      }
      textFieldProps={{ fullWidth: true }}
    />
  )
}
