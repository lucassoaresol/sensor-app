import { Outlet, useParams } from 'react-router-dom'
import { Aside, LayoutFullBasePage } from '../../shared'
import { ViewUnit } from './view'

export const InspPage = () => {
  const { unit_id } = useParams()

  return (
    <LayoutFullBasePage>
      {unit_id ? (
        <Outlet />
      ) : (
        <>
          <ViewUnit />
          <Aside />
        </>
      )}
    </LayoutFullBasePage>
  )
}
