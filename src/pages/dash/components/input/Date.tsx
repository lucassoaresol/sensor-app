import { useMemo, useState } from 'react'
import { TextFieldElement, useFormContext } from 'react-hook-form-mui'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DialogBaseChildrenAction, iDataBase } from '../../../../shared'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'

interface iDateProps {
  name: string
  label: string
}

export const Date = ({ label, name }: iDateProps) => {
  const { watch, setValue } = useFormContext()
  const year: iDataBase = watch('year')

  const maxDate = useMemo(() => {
    if (year) {
      if (+year.name === dayjs().year()) return dayjs()
      return dayjs(`${year.name}-12-31`)
    }

    return dayjs()
  }, [year])

  const initialValue = useMemo(() => {
    if (name === 'initial' && year) return dayjs(`${year.name}-01-01`)

    return maxDate
  }, [year, name])

  const [valueDate, setValueDate] = useState<Dayjs | null>(initialValue)

  const [open, setOpen] = useState(false)
  const onClose = () => setOpen((old) => !old)

  return (
    <>
      <TextFieldElement
        name={name}
        label={label}
        required
        fullWidth
        inputProps={{ readOnly: true }}
        onClick={onClose}
      />
      <DialogBaseChildrenAction
        open={open}
        onClose={onClose}
        description=""
        title={`Selecionar ${label}`}
        action={() => {
          if (valueDate) setValue(name, valueDate.format('L'))
          onClose()
        }}
        actionTitle="Continuar"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <DateCalendar
            value={valueDate}
            onChange={(newValue) => setValueDate(newValue)}
            minDate={year ? dayjs(`${year.name}-01-01`) : undefined}
            maxDate={maxDate}
            views={['month', 'day']}
          />
        </LocalizationProvider>
      </DialogBaseChildrenAction>
    </>
  )
}
