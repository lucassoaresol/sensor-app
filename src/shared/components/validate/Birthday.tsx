import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form-mui'

export const ValidateBirthday = () => {
  const { setValue, watch } = useFormContext()
  const birthday = watch('birthday')

  useEffect(() => {
    if (typeof birthday === 'string') {
      const notNumber = birthday.replace(/\D/g, '')
      setValue('birthday', notNumber)
      const limitNumber = notNumber.substring(0, 8)
      setValue('birthday', limitNumber)
      const value = limitNumber.replace(/^(\d{2})(\d{2})(\d)/, '$1/$2/$3')
      setValue('birthday', value)
    }
  }, [birthday])
  return <></>
}
