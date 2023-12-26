import { apiUsingNow } from './api'
import { iCodErr } from '../interfaces'

interface ilistReturn {
  total: number
  result: iCodErr[]
}

const list = async (query: string): Promise<ilistReturn> => {
  const { data: response } = await apiUsingNow.get<ilistReturn>(`cod${query}`)
  return response
}

export const apiCod = {
  list,
}
