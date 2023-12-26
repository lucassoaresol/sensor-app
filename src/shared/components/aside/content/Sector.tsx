import {
  Box,
  Divider,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { CorporateFare, Edit } from '@mui/icons-material'
import { iDataBase } from '../../../../shared'

interface iSectorProps {
  sector: iDataBase
  is_file?: boolean
}

export const Sector = ({ sector, is_file }: iSectorProps) => {
  const { unit_id } = useParams()

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
          <CorporateFare />
          Setor
        </Typography>
        {!is_file && (
          <Tooltip title="Editar">
            <IconButton size="small" href={`/insp/${unit_id}`}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Divider />
      <Box display="flex" justifyContent="center" gap={1} p={1} px={2}>
        <Typography fontWeight="bolder" variant="body2">
          {sector.name.toUpperCase()}
        </Typography>
      </Box>
    </Box>
  )
}
