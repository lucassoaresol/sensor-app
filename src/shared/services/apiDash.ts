import { apiUsingNow } from './api'
import { iAccDashData, iDataBase, iReturnDashData, iYear } from '../interfaces'

const acc = async (query: string): Promise<iAccDashData> => {
  const { data: response } = await apiUsingNow.get<{
    aut: number
    rep: number
    ind: number
  }>(`dash/acc${query}`)
  return response
}

const days = async (query: string): Promise<iReturnDashData> => {
  const { data: response } = await apiUsingNow.get<iReturnDashData>(
    `dash/day${query}`,
  )
  return response
}

const errs = async (query: string): Promise<iReturnDashData> => {
  const { data: response } = await apiUsingNow.get<iReturnDashData>(
    `dash/err${query}`,
  )
  return response
}

const errYear = async (query: string): Promise<iReturnDashData> => {
  const { data: response } = await apiUsingNow.get<iReturnDashData>(
    `dash/err/year${query}`,
  )
  return response
}

const lines = async (query: string): Promise<iReturnDashData> => {
  const { data: response } = await apiUsingNow.get<iReturnDashData>(
    `dash/line${query}`,
  )
  return response
}

const months = async (query: string): Promise<iDataBase[]> => {
  const { data: response } = await apiUsingNow.get<iDataBase[]>(
    `dash/month${query}`,
  )
  return response
}

const products = async (query: string): Promise<iReturnDashData> => {
  const { data: response } = await apiUsingNow.get<iReturnDashData>(
    `dash/product${query}`,
  )
  return response
}

const sectors = async (query: string): Promise<iDataBase[]> => {
  const { data: response } = await apiUsingNow.get<iDataBase[]>(
    `dash/sector${query}`,
  )
  return response
}

const shifts = async (query: string): Promise<iDataBase[]> => {
  const { data: response } = await apiUsingNow.get<iDataBase[]>(
    `dash/shift${query}`,
  )
  return response
}

const units = async (query: string): Promise<iDataBase[]> => {
  const { data: response } = await apiUsingNow.get<iDataBase[]>(
    `dash/unit${query}`,
  )
  return response
}

const years = async (): Promise<iYear[]> => {
  const { data: response } = await apiUsingNow.get<iYear[]>('dash/year')
  return response
}

export const apiDash = {
  acc,
  days,
  errs,
  errYear,
  lines,
  months,
  products,
  sectors,
  shifts,
  units,
  years,
}
