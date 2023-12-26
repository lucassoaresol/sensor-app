import { apiUsingNow } from './api'
import { iDump } from '../interfaces'
import { FieldValues } from 'react-hook-form'

const list = async (query: string): Promise<iDump[]> => {
  const { data: response } = await apiUsingNow.get<iDump[]>(`dumps${query}`)

  return response
}

const route = async (data: FieldValues, dump_id: number): Promise<iDump> => {
  const { data: response } = await apiUsingNow.post<iDump>(
    `dumps/${dump_id}/route`,
    data,
  )

  return response
}

const updateRoute = async (
  data: FieldValues,
  route_id: string,
): Promise<iDump> => {
  const { data: response } = await apiUsingNow.patch<iDump>(
    `dumps/route/${route_id}`,
    data,
  )

  return response
}

const reserve = async (dump_id: number): Promise<iDump> => {
  const { data: response } = await apiUsingNow.post<iDump>(
    `dumps/${dump_id}/reserve`,
  )

  return response
}

const collection = async (
  data: FieldValues,
  dump_id: number,
): Promise<iDump> => {
  const { data: response } = await apiUsingNow.post<iDump>(
    `dumps/${dump_id}/collection`,
    data,
  )

  return response
}

const updateCollection = async (
  data: FieldValues,
  collection_id: string,
): Promise<iDump> => {
  const { data: response } = await apiUsingNow.patch<iDump>(
    `dumps/collection/${collection_id}`,
    data,
  )

  return response
}

export const apiDump = {
  list,
  route,
  updateRoute,
  reserve,
  collection,
  updateCollection,
}
