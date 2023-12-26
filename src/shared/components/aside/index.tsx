import { Grid } from '@mui/material'
import { iDataBase } from '../../../shared'
import { Sector, Unit, User } from './content'

interface iAsideProps {
  unit?: iDataBase
  sector?: iDataBase
  is_file?: boolean
}

export const Aside = ({ is_file, sector, unit }: iAsideProps) => {
  return (
    <Grid item xs={12} md={3}>
      {sector && <Sector sector={sector} is_file={is_file} />}
      {unit && <Unit unit={unit} is_file={is_file} />}
      <User />
    </Grid>
  )
}
