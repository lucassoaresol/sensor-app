import { Button } from '@mui/material'
import { useFormContext } from 'react-hook-form'

export const ResetButton = () => {
  const { reset } = useFormContext()

  return <Button onClick={() => reset({ quant: 10 })}>Limpar</Button>
}
