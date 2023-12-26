import { Box, Divider, Drawer, List } from '@mui/material'
import { ReactSVG } from 'react-svg'
import { useAppThemeContext, useDrawerContext } from '../../../shared'
import { Filter } from './Filter'

export const MenuDrawer = () => {
  const { theme } = useAppThemeContext()
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext()

  return (
    <Drawer open={isDrawerOpen} onClose={toggleDrawerOpen}>
      <Box
        display="flex"
        flexDirection="column"
        width={theme.spacing(28)}
        height="100%"
        bgcolor={theme.palette.background.paper}
      >
        <Box
          width="100%"
          height={theme.spacing(8)}
          display="flex"
          flexDirection="column"
          flexShrink={0}
          justifyContent="space-evenly"
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            <ReactSVG
              src="/logo.svg"
              beforeInjection={(svg) => {
                svg.setAttribute('style', 'width: 80%;margin-left: 20px')
              }}
            />
          </Box>
        </Box>
        <Divider />
        <Box flex={1}>
          <List component="nav">
            <Filter />
          </List>
        </Box>
      </Box>
    </Drawer>
  )
}
