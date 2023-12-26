import {
  Box,
  Divider,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'
import { Edit, Factory } from '@mui/icons-material'
import { iDataBase } from '../../../../shared'

interface iUnitProps {
  unit: iDataBase
  is_file?: boolean
}

export const Unit = ({ unit, is_file }: iUnitProps) => {
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
          <Factory />
          Unidade
        </Typography>
        {!is_file && (
          <Tooltip title="Editar">
            <IconButton size="small" href="/insp">
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Divider />
      <Box display="flex" justifyContent="center" gap={1} p={1} px={2}>
        <Typography fontWeight="bolder" variant="body2">
          {unit.name.toUpperCase()}
        </Typography>
      </Box>
    </Box>
  )
}
