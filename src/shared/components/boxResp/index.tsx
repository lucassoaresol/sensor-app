import { Box, Typography, useMediaQuery } from '@mui/material'
import { ReactSVG } from 'react-svg'
import { iChildren } from '../../interfaces'

interface iBoxRespProps extends iChildren {
  isLogin?: boolean
  isProfile?: boolean
}

export const BoxResp = ({ children, isLogin, isProfile }: iBoxRespProps) => {
  const matches = useMediaQuery('(max-width:305px)')
  const dateData = new Date()
  if (matches) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        width="80vw"
      >
        {!isProfile && (
          <ReactSVG
            src="/logo.svg"
            beforeInjection={(svg) => {
              svg.setAttribute('style', 'width: 100%')
            }}
          />
        )}
        {children}
        {isLogin && (
          <Typography fontSize="0.7rem">
            {dateData.getUTCFullYear()} © Lucas Soares
          </Typography>
        )}
      </Box>
    )
  }
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      {!isProfile && (
        <ReactSVG
          src="/logo.svg"
          beforeInjection={(svg) => {
            svg.setAttribute('style', 'width: 100%')
          }}
        />
      )}
      {children}
      {isLogin && (
        <Typography>{dateData.getUTCFullYear()} © Lucas Soares</Typography>
      )}
    </Box>
  )
}
