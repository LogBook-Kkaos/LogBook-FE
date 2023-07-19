import Image from 'next/image'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button, { ButtonProps }  from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Styled Components
const ButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  margin: theme.spacing(4.5),
  width: 150,
}))

const HomePage = () => {

  return (
    <Box className='content-center' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Image src="/images/LogBook_Logo(1).svg" alt="Logo" width={400} height={200} />
      <Typography variant='body2'>Work on your project efficiently with the release note sharing system!</Typography>
      <Box>
        <ButtonStyled variant='contained'>
          Sign up
          <input
            hidden
            type='file'
            accept='image/png, image/jpeg'
            id='account-settings-upload-image'
          />
        </ButtonStyled>
        <ButtonStyled variant='contained'>
          Login
          <input
            hidden
            type='file'
            accept='image/png, image/jpeg'
            id='account-settings-upload-image'
          />
        </ButtonStyled>
      </Box>
    </Box>
  )
}

export default HomePage
