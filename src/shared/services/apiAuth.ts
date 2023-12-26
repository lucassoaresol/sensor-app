import { apiUsingNow } from './api'
import {
  iLoginRequest,
  iLoginResponse,
  iRecoveryPasswordRequest,
  iRecoveryRequest,
  iSelectBase,
  iYear,
} from '../interfaces'

const login = async (data: iLoginRequest): Promise<iLoginResponse> => {
  const { data: response } = await apiUsingNow.post<iLoginResponse>(
    'login',
    data,
  )
  return response
}

const recovery = async (data: iRecoveryRequest): Promise<iLoginResponse> => {
  const { data: response } = await apiUsingNow.post('password', data)

  return response
}

const passwordRecovery = async (
  data: iRecoveryPasswordRequest,
  token: string,
): Promise<void> => {
  await apiUsingNow.put(`password`, data, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

interface iVerify {
  select: iSelectBase
  years?: iYear[]
  school?: iSelectBase
  year?: iSelectBase
}

const verify = async (query: string): Promise<iVerify> => {
  const { data: response } = await apiUsingNow.get<iVerify>(`verify${query}`)
  return response
}

const verifyPassword = async (
  data: iRecoveryPasswordRequest,
): Promise<void> => {
  await apiUsingNow.post('verify/password', data)
}

export const apiAuth = {
  login,
  recovery,
  passwordRecovery,
  verify,
  verifyPassword,
}
