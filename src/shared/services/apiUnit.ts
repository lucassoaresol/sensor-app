import { apiUsingNow } from './api'
import { iDataBase, iSectorUnit } from '../interfaces'

interface iListReturn {
  total: number
  result: iDataBase[]
}

const list = async (): Promise<iListReturn> => {
  const { data: response } = await apiUsingNow.get<iListReturn>('units')
  return response
}

interface iListSectorsReturn {
  total: number
  result: iSectorUnit[]
}

const listSectors = async (id: string): Promise<iListSectorsReturn> => {
  const { data: response } = await apiUsingNow.get<iListSectorsReturn>(
    `units/${id}/sectors`,
  )
  return response
}

const retrieve = async (id: string): Promise<iDataBase> => {
  const { data: response } = await apiUsingNow.get<iDataBase>(`units/${id}`)
  return response
}

export const apiUnit = {
  list,
  listSectors,
  retrieve,
}
