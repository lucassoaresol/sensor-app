import { apiUsingNow } from './api'
import { iDataBase } from '../interfaces'

const retrieve = async (ficha: number): Promise<iDataBase> => {
  const { data: response } = await apiUsingNow.get<iDataBase>(`files/${ficha}`)
  return response
}

export const apiFile = { retrieve }
