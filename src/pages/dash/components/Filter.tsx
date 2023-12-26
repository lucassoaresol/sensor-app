import { SwitchElement } from 'react-hook-form-mui'
import { Grid } from '@mui/material'
import {
  PeriodInput,
  SectorInput,
  ShiftInput,
  UnitInput,
  YearInput,
} from './input'
import { ResetButton } from './Reset'

export const Filter = () => {
  return (
    <Grid container p={1.2} spacing={1.5} direction="column">
      <Grid item>
        <UnitInput />
      </Grid>
      <Grid item>
        <SectorInput />
      </Grid>
      <Grid item container alignItems="center">
        <ShiftInput />
      </Grid>
      <Grid item>
        <YearInput />
      </Grid>
      <Grid item alignSelf="center">
        <SwitchElement label="Período" name="is_period" />
      </Grid>
      <Grid item>
        <PeriodInput />
      </Grid>
      <Grid item alignSelf="center">
        <SwitchElement label="Percentual" name="is_perc" />
      </Grid>
      <Grid item alignSelf="center">
        <ResetButton />
      </Grid>
    </Grid>
  )
}
