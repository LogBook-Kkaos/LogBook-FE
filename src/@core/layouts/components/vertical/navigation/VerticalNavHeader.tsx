// ** React Import
import { ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Recoil Import
import { useRecoilValue } from 'recoil'
import { isAuthenticatedState } from 'src/recoil/auth/atoms'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
  verticalNavMenuBranding?: (props?: any) => ReactNode
}

// ** Styled Components
const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(4.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const LogoLinkStyled = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  cursor: 'pointer'
})

const VerticalNavHeader = (props: Props) => {
  // ** Props
  const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props

  // ** Hooks
  const theme = useTheme()
  const router = useRouter()

  // ** State
  const isAuthenticated = useRecoilValue(isAuthenticatedState)

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: 6 }}>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
          <LogoLinkStyled onClick={
            () => {
              if (isAuthenticated) {
                router.push('/dashboard')
              } else {
                router.push('/')
              }
            }
          }>
            <Image src="/images/LogBook_Logo_horizontal.svg" alt="Logo" width={150} height={75} />
          </LogoLinkStyled>
      )}

    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
