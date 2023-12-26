import { apiUsingNow } from './api'
import { iInspection, iSample } from '../interfaces'
import { FieldValues } from 'react-hook-form'

const create = async (data: FieldValues): Promise<iInspection> => {
  const { data: response } = await apiUsingNow.post<iInspection>(
    'inspections',
    data,
  )
  return response
}

const createSample = async (
  id: string,
  data: FieldValues,
): Promise<iInspection> => {
  const { data: response } = await apiUsingNow.post<iInspection>(
    `inspections/${id}`,
    data,
  )
  return response
}

interface ilistSampleReturn {
  total: number
  result: iSample[]
}

const listSample = async (id: string): Promise<ilistSampleReturn> => {
  const { data: response } = await apiUsingNow.get<ilistSampleReturn>(
    `inspections/${id}`,
  )
  return response
}

const update = async (id: string, data: FieldValues): Promise<iInspection> => {
  const { data: response } = await apiUsingNow.patch<iInspection>(
    `inspections/${id}`,
    data,
  )
  return response
}

const destroy = async (id: string): Promise<void> => {
  await apiUsingNow.delete(`inspections/${id}`)
}

export const apiInspection = {
  create,
  createSample,
  listSample,
  update,
  destroy,
}
