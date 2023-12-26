export interface iLocation {
  lat: number
  lon: number
}

export interface iDump {
  id: number
  name: string
  sector: string
  lat: number
  lon: number
  cap: number
  value: number
  prc: number
  is_collecting: boolean
  is_active: boolean
  label: string
  distance?: number
}

export interface iRoute {
  id: string
  created_at: Date
  dump: iDump
}
