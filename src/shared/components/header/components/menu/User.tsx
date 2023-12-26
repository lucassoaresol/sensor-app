import { Password } from '@mui/icons-material'
import { ListItemIcon, Menu, MenuItem } from '@mui/material'
import { useDialogContext } from '../../../../../shared'

interface iMenuBaseProps {
  anchorEl: HTMLElement | null
  handleClose: () => void
}

export const MenuUser = ({ anchorEl, handleClose }: iMenuBaseProps) => {
  const { handleOpenEdit } = useDialogContext()

  const onClickPassword = () => {
    handleClose()
    handleOpenEdit()
  }

  return (
    <Menu
      sx={{ mt: '45px' }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={onClickPassword}>
        <ListItemIcon>
          <Password />
        </ListItemIcon>
        Editar Senha
      </MenuItem>
    </Menu>
  )
}
