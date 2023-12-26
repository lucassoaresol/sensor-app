import { apiUsingNow } from './api'
import { iDataBase, iSectorUnit } from '../interfaces'

interface iListReturn {
  total: number
  result: iDataBase[]
}

const list = async (query: string): Promise<iListReturn> => {
  const { data: response } = await apiUsingNow.get<iListReturn>(
    `sectors${query}`,
  )
  return response
}

const retrieve = async (id: string): Promise<iDataBase> => {
  const { data: response } = await apiUsingNow.get<iDataBase>(`sectors/${id}`)
  return response
}

const retrieveUnit = async (id: string): Promise<iSectorUnit> => {
  const { data: response } = await apiUsingNow.get<iSectorUnit>(
    `sectors/${id}/unit`,
  )
  return response
}

export const apiSector = {
  list,
  retrieve,
  retrieveUnit,
}
