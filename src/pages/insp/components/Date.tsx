import { useState } from 'react'
import { TextFieldElement, useFormContext } from 'react-hook-form-mui'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DialogBaseChildrenAction } from '../../../shared'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'

interface iDateProps {
  name: string
  label: string
}

export const Date = ({ label, name }: iDateProps) => {
  const { setValue } = useFormContext()
  const [valueDate, setValueDate] = useState<Dayjs | null>(dayjs())
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
            maxDate={dayjs()}
            views={['month', 'year', 'day']}
          />
        </LocalizationProvider>
      </DialogBaseChildrenAction>
    </>
  )
}
