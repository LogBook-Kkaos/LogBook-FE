// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

// ** HTTP Client
import axios from 'axios'
import Cookies from 'js-cookie'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { set } from 'nprogress'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const LogoLinkStyled = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

interface formData {
  email: string
  password: string
}

interface ModalInfo {
  open: boolean
  message: string
  messageDesc: string
  color: string
}
const LoginPage = () => {
  // ** State
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<formData>()
  const [showPassword, setShowPassword] = useState(false)
  const [modalInfo, setModalInfo] = useState<ModalInfo>({ open: false, message: '', messageDesc: '', color: '' });

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  useEffect(() => {
    register('email', { required: true })
    register('password', { required: true })
  }, [register])

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const onSubmit: SubmitHandler<formData> = (data) => {
    axios.post('/api/users/login', data)
      .then((response) => {
        const { accessToken, refreshToken } = response.data.result;

        Cookies.set('accessToken', accessToken);
        sessionStorage.setItem('accessToken', accessToken);
        Cookies.set('refreshToken', refreshToken);
        sessionStorage.setItem('refreshToken', refreshToken);

        setModalInfo({
          open: true,
          message: '로그인 성공',
          messageDesc: '로그인에 성공하였습니다.',
          color: 'success'
        });

        router.push('/dashboard');
  
      }, (error) => {
        if (error.response.status === 404) {
          setModalInfo({
            open: true,
            message: '로그인 실패',
            messageDesc: '존재하지 않는 사용자입니다.',
            color: 'error'
          });
        } else if (error.response.status === 400) {
          setModalInfo({
            open: true,
            message: '로그인 실패',
            messageDesc: '비밀번호가 일치하지 않습니다.',
            color: 'error'
          });
        } else if (error.response.status === 500) {
          setModalInfo({
            open: true,
            message: '로그인 실패',
            messageDesc: '서버에 오류가 발생하였습니다.',
            color: 'error'
          });
      }
      })
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(7, 9, 7)} !important` }}>
          <Box sx={{ mb:3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* 로고 눌렀을때 로그인 여부 확인하여 이동 */}
          <Link href='/' passHref>
            <LogoLinkStyled>
            <Image src="/images/LogBook_Logo_horizontal.svg" alt="Logo" width={250} height={100} />
            </LogoLinkStyled>
          </Link>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              다시 만나 반가워요! 👋🏻
            </Typography>
            <Typography variant='body2'>릴리즈 노트 서비스를 이용하려면 로그인해주세요.</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <TextField autoFocus fullWidth id='email' label='이메일' sx={{ marginBottom: 4 }} {...register('email')} />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>비밀번호</InputLabel>
              <OutlinedInput
                label='Password'
                id='auth-login-password'
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />} label='자동 로그인' />
              <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>비밀번호를 잊으셨나요?</LinkStyled>
              </Link>
            </Box>
            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              type='submit'
            >
              로그인
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                처음 이용하시나요?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/pages/register'>
                  <LinkStyled>회원가입</LinkStyled>
                </Link>
              </Typography>
            </Box>
            <Divider sx={{ my: 5 }}>소셜 로그인</Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Facebook sx={{ color: '#497ce2' }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Twitter sx={{ color: '#1da1f2' }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Github
                    sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : theme.palette.grey[300]) }}
                  />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Google sx={{ color: '#db4437' }} />
                </IconButton>
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
      <Dialog
        open={modalInfo.open}
        onClose={() => { }}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{modalInfo.message}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description' style={{color: modalInfo.color }}>
            {modalInfo.messageDesc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalInfo({ open: false, message: '', messageDesc: '', color: '' })} color='primary' autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
