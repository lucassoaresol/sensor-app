import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useAppThemeContext, iDataBase, apiSector, Aside } from '../../shared'
import { useEffect, useState } from 'react'
import { ViewFile } from './view'

export const SectorPage = () => {
  const navigate = useNavigate()
  const { unit_id, key, file_id } = useParams()
  const { setLoading } = useAppThemeContext()
  const [unitData, setUnitData] = useState<iDataBase>()
  const [sectorData, setSectorData] = useState<iDataBase>()

  useEffect(() => {
    if (key) {
      setLoading(true)
      apiSector
        .retrieveUnit(key)
        .then((res) => {
          setUnitData(res.unit)
          setSectorData(res.sector)
        })
        .catch(() => navigate(`/insp/${unit_id}`))
        .finally(() => setLoading(false))
    }
  }, [key])

  return (
    <>
      {file_id ? (
        <Outlet />
      ) : (
        <>
          <ViewFile />
          <Aside sector={sectorData} unit={unitData} />
        </>
      )}
    </>
  )
}
