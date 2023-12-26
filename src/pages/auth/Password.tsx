import { useState } from 'react'
import { FormContainer, PasswordElement } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, IconButton } from '@mui/material'
import { Info } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import {
  BasePage,
  BoxResp,
  Glossary,
  apiAuth,
  iRecoveryPasswordRequest,
  passwordRecoverySchema,
  useAppThemeContext,
} from '../../shared'

export const PasswordPage = () => {
  const navigate = useNavigate()
  const { token } = useParams()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  const password = (data: iRecoveryPasswordRequest) => {
    if (token) {
      setLoading(true)
      apiAuth
        .passwordRecovery(data, token)
        .then(() => {
          handleSucess('Sua nova senha foi definida com sucesso')
          navigate('/login')
        })
        .catch(() => handleError('Ocorreu um erro ao definir a nova senha'))
        .finally(() => setLoading(false))
    }
  }

  return (
    <>
      <BasePage padding={6}>
        <FormContainer
          onSuccess={password}
          resolver={zodResolver(passwordRecoverySchema)}
        >
          <BoxResp isLogin>
            <IconButton onClick={handleOpen} color="secondary">
              <Info />
            </IconButton>
            <PasswordElement
              name="password"
              label="Nova Senha"
              required
              fullWidth
            />
            <PasswordElement
              name="repeat_password"
              label="Confirmar Nova Senha"
              required
              fullWidth
            />
            <Button variant="contained" type="submit" fullWidth>
              Enviar
            </Button>
          </BoxResp>
        </FormContainer>
      </BasePage>
      <Glossary open={open} onClose={handleOpen}>
        Preencha as informações com a sua nova senha e repita-a para ter acesso
        ao sistema com a senha atualizada.
      </Glossary>
    </>
  )
}
