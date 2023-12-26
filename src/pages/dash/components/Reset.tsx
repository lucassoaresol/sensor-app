import { Button } from '@mui/material'
import { useFormContext } from 'react-hook-form'

export const ResetButton = () => {
  const { reset } = useFormContext()

  return (
    <Button
      onClick={() =>
        reset({
          unit: '',
          sector: '',
          shift: '',
          year: '',
          is_period: false,
          month: '',
          is_perc: false,
          disabled: true,
        })
      }
    >
      Limpar
    </Button>
  )
}
