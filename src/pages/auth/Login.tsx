import { zodResolver } from '@hookform/resolvers/zod'
import { Button, IconButton } from '@mui/material'
import { Login as LoginIcon, LockReset, Info } from '@mui/icons-material'
import {
  FormContainer,
  TextFieldElement,
  PasswordElement,
} from 'react-hook-form-mui'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  useAuthContext,
  BasePage,
  loginSchema,
  BoxResp,
  ValidateLogin,
  Glossary,
} from '../../shared'

export const LoginPage = () => {
  const { isAuthenticated, login } = useAuthContext()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  if (isAuthenticated) return <Navigate to="/" />

  return (
    <>
      <BasePage padding={6}>
        <FormContainer onSuccess={login} resolver={zodResolver(loginSchema)}>
          <BoxResp isLogin>
            <IconButton onClick={handleOpen} color="primary">
              <Info />
            </IconButton>
            <TextFieldElement name="email" label="Email" required fullWidth />
            <ValidateLogin />
            <PasswordElement name="password" label="Senha" required fullWidth />
            <Button
              variant="contained"
              startIcon={<LoginIcon />}
              type="submit"
              fullWidth
            >
              Entrar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<LockReset />}
              href="/password"
              fullWidth
            >
              Recuperar Senha
            </Button>
          </BoxResp>
        </FormContainer>
      </BasePage>
      <Glossary open={open} onClose={handleOpen}>
        Preencha as informações com seu usuário e senha para obter acesso ao
        sistema.
      </Glossary>
    </>
  )
}
