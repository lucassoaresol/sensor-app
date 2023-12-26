import { Box, Divider, Paper, Typography } from '@mui/material'
import { AccountBox } from '@mui/icons-material'
import { useAuthContext } from '../../../../shared'

export const User = () => {
  const { userProfile } = useAuthContext()

  return (
    <Box mb={2} component={Paper}>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={1}
      >
        <Typography
          component="div"
          variant="body1"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <AccountBox />
          Meu Cadastro
        </Typography>
      </Box>
      <Divider />
      <Box display="flex" flexDirection="column" gap={1} p={1} px={2}>
        <Typography
          component="div"
          display="flex"
          gap={1}
          fontWeight="bolder"
          variant="body2"
        >
          Nome: <Typography variant="subtitle2">{userProfile?.name}</Typography>
        </Typography>
        <Typography
          component="div"
          display="flex"
          gap={1}
          fontWeight="bolder"
          variant="body2"
        >
          CPF: <Typography variant="subtitle2">{userProfile?.cpf}</Typography>
        </Typography>
      </Box>
    </Box>
  )
}
