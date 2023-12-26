import { createTheme } from '@mui/material'
import { ptBR } from '@mui/material/locale'

export const Theme = createTheme(
  {
    palette: {
      primary: {
        main: '#2B5B3B',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#F2ECD8',
        contrastText: '#272727',
      },
      background: { default: '#E2E8F0', paper: '#FFFFFF' },
    },
  },
  ptBR,
)
