import { z } from 'zod'
import { fileFindSchema, iDataBase, iSectorUnit } from '../../shared'

export interface iProduct extends iDataBase {
  ref: string
}

export interface iFile {
  id: string
  ficha: number
  product: iProduct
}

export interface iInspection {
  id: string
  total: number
  created_at: Date
  file: iFile
  sector: iSectorUnit
}

export interface iCodErr {
  id: string
  cod: string
  description: string
  label: string
}

export interface iSample {
  id: string
  total: number
  cod: iCodErr
}

export type iFileFindRequest = z.infer<typeof fileFindSchema>
