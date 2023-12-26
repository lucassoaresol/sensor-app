import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useAppThemeContext, apiUnit, iDataBase, Aside } from '../../shared'
import { useEffect, useState } from 'react'
import { ViewSector } from './view'

export const UnitPage = () => {
  const navigate = useNavigate()
  const { unit_id, key } = useParams()
  const { setLoading } = useAppThemeContext()
  const [unitData, setUnitData] = useState<iDataBase>()

  useEffect(() => {
    if (unit_id) {
      setLoading(true)
      apiUnit
        .retrieve(unit_id)
        .then((res) => setUnitData(res))
        .catch(() => navigate('/insp'))
        .finally(() => setLoading(false))
    }
  }, [unit_id])

  return (
    <>
      {key ? (
        <Outlet />
      ) : (
        <>
          {unit_id && <ViewSector unit_id={unit_id} />}
          <Aside unit={unitData} />
        </>
      )}
    </>
  )
}
