import { useState, useEffect } from 'react'
import { AutocompleteElement, useFormContext } from 'react-hook-form-mui'
import { iDataBase, iDataBaseSelect } from '../../interfaces'
import { apiUnit } from '../../services'

export const AutoCompleteSector = () => {
  const { watch } = useFormContext()
  const unit: iDataBase = watch('unit')
  const [sectorsData, setSectorsData] = useState<iDataBaseSelect[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    if (unit)
      apiUnit
        .listSectors(unit.id)
        .then((res) => {
          setSectorsData(
            res.result.map((el) => {
              return { id: el.key, name: el.sector.name, label: el.sector.name }
            }),
          )
        })
        .finally(() => setLoading(false))
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
                label: 'No momento, não há nenhum setor cadastrado',
              },
            ]
      }
      textFieldProps={{ fullWidth: true }}
    />
  )
}
