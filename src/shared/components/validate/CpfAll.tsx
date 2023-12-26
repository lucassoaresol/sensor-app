import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form-mui'

export const ValidateCPFAll = () => {
  const { setValue, watch } = useFormContext()
  const cpf = watch('cpf')

  useEffect(() => {
    if (typeof cpf === 'string') {
      const notNumber = cpf.replace(/\D/g, '')
      setValue('cpf', notNumber)
      const limitNumber = notNumber.substring(0, 11)
      setValue('cpf', limitNumber)
      const value = limitNumber.replace(
        /^(\d{3})(\d{3})(\d{3})(\d)/,
        '$1.$2.$3-$4',
      )
      setValue('cpf', value)
    }
  }, [cpf])
  return <></>
}
