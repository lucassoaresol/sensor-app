import { useNavigate, useParams } from 'react-router-dom'
import {
  useAppThemeContext,
  iInspection,
  apiInspection,
  defineShift,
  Aside,
} from '../../shared'
import { useEffect, useState } from 'react'
import { ViewInspection } from './view'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

export const FilePage = () => {
  const navigate = useNavigate()
  const { unit_id, key, file_id } = useParams()
  const { setLoading, handleError } = useAppThemeContext()
  const [inspectionData, setInspectionData] = useState<iInspection>()

  useEffect(() => {
    if (key && file_id) {
      setLoading(true)
      apiInspection
        .create({
          year: String(dayjs().year()),
          shift: defineShift(dayjs().hour()),
          date: dayjs().format('DD/MM/YYYY'),
          name: dayjs().format('MMMM'),
          file_id,
          sector_id: key,
        })
        .then((res) => setInspectionData(res))
        .catch(() => {
          handleError('Ficha já avaliada')
          navigate(`/insp/${unit_id}/${key}`)
        })
        .finally(() => setLoading(false))
    }
  }, [key, file_id])

  return (
    <>
      {inspectionData && <ViewInspection inspection={inspectionData} />}
      <Aside
        sector={inspectionData?.sector.sector}
        unit={inspectionData?.sector.unit}
        is_file
      />
    </>
  )
}
