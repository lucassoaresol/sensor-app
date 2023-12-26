import { zodResolver } from '@hookform/resolvers/zod'
import { Button, IconButton } from '@mui/material'
import { Login as LoginIcon, LockReset, Info } from '@mui/icons-material'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { useState } from 'react'
import { Navigate, Outlet, useNavigate, useParams } from 'react-router-dom'
import {
  useAuthContext,
  BasePage,
  recoverySchema,
  BoxResp,
  ValidateLogin,
  ValidateCPFAll,
  Glossary,
  ValidateBirthday,
  iRecoveryRequest,
  apiAuth,
  useAppThemeContext,
} from '../../shared'

export const RecoveryPage = () => {
  const navigate = useNavigate()
  const { token } = useParams()
  const { setLoading, handleError, handleSucess } = useAppThemeContext()
  const { isAuthenticated } = useAuthContext()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  if (isAuthenticated) return <Navigate to="/" />

  if (token) return <Outlet />

  const recovery = (data: iRecoveryRequest) => {
    setLoading(true)
    apiAuth
      .recovery(data)
      .then((res) => {
        handleSucess('Confirmação dos dados bem-sucedida')
        navigate(`/password/${res.token}`)
      })
      .catch(() => handleError('A confirmação dos dados não foi bem-sucedida'))
      .finally(() => setLoading(false))
  }

  return (
    <>
      <BasePage padding={6}>
        <FormContainer
          onSuccess={recovery}
          resolver={zodResolver(recoverySchema)}
        >
          <BoxResp isLogin>
            <IconButton onClick={handleOpen} color="secondary">
              <Info />
            </IconButton>
            <TextFieldElement name="login" label="Usuário" required fullWidth />
            <ValidateLogin />
            <TextFieldElement name="cpf" label="CPF" required fullWidth />
            <ValidateCPFAll />
            <TextFieldElement
              name="birthday"
              label="Data de Nascimento"
              required
              fullWidth
            />
            <ValidateBirthday />
            <Button
              variant="contained"
              color="secondary"
              startIcon={<LockReset />}
              type="submit"
              fullWidth
            >
              Recuperar Senha
            </Button>
            <Button
              variant="contained"
              startIcon={<LoginIcon />}
              href="/login"
              fullWidth
            >
              Entrar
            </Button>
          </BoxResp>
        </FormContainer>
      </BasePage>
      <Glossary open={open} onClose={handleOpen}>
        Preencha os campos com seus dados. Após a confirmação, você poderá
        prosseguir com a troca de senha.
      </Glossary>
    </>
  )
}
