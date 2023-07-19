// ** React Imports
import { useState, Fragment, ChangeEvent, MouseEvent, ReactNode, FormEvent } from 'react'

// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'

import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'
import axios from 'axios'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

interface State {
  password: string
  confirmPassword: string
  showPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '40rem' }
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
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const userNameState = atom({
  key: 'userName',
  default: '',
});

const emailState = atom({
  key: 'email',
  default: '',
});

const departmentState = atom({
  key: 'department',
  default: '',
});

const passwordState = atom({
  key: 'password',
  default: '',
});

const userState = selector({
  key: 'userState',
  get: ({ get }) => {
    const userName = get(userNameState);
    const email = get(emailState);
    const department = get(departmentState);
    const password = get(passwordState);

    return { userName, email, department, password };
  }
})

const RegisterPage = () => {
  const [userName, setUserName] = useRecoilState(userNameState);
  const [email, setEmail] = useRecoilState(emailState);
  const [department, setDepartment] = useRecoilState(departmentState);
  const [password, setPassword] = useRecoilState(passwordState);
  const user = useRecoilValue(userState);

  const handleSignUpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/user/register', user);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const [values, setValues] = useState<State>({
    password: '',
    confirmPassword: '',
    showPassword: false
  })


  // ** Hook
  const theme = useTheme()

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
    setPassword(event.target.value)
  }
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }


  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 30, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* 로고 눌렀을때 로그인 여부 확인하여 이동 */}
            <Link href='/' passHref>
              <LogoLinkStyled>
              <Image src="/images/LogBook_Logo(2).svg" alt="Logo" width={250} height={100} />
              </LogoLinkStyled>
            </Link>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              처음 만나는 릴리즈 노트 시스템 👋
            </Typography>
            <Typography variant='body2'>릴리즈 노트를 쉽게 작성해보세요.</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSignUpSubmit}>
            <TextField autoFocus fullWidth id='username' label='이름' sx={{ marginBottom: 4 }} value={userName} onChange={(e) => setUserName(e.target.value)} />
            <TextField fullWidth type='email' label='이메일' sx={{ marginBottom: 4 }} value={email} onChange={(e) => setEmail(e.target.value)} />
            <FormControl fullWidth>
              <InputLabel id='form-layouts-separator-select-label'>소속 / 부서명</InputLabel>
              <Select
                label='소속 / 부서명'
                defaultValue=''
                id='form-layouts-separator-select'
                labelId='form-layouts-separator-select-label'
                sx={{ marginBottom: 4 }}
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <MenuItem value='소프트웨어 개발'>소프트웨어 개발</MenuItem>
                <MenuItem value='서버/인프라 기술'>서버/인프라 기술</MenuItem>
                <MenuItem value='데이터베이스 관리'>데이터베이스 관리</MenuItem>
                <MenuItem value='품질 보증/테스트'>품질 보증/테스트</MenuItem>
                <MenuItem value='사용자 경험/사용자 인터페이스 디자인'>사용자 경험/사용자 인터페이스 디자인</MenuItem>
                <MenuItem value='IT 보안'>IT 보안</MenuItem>
                <MenuItem value='네트워크 관리'>네트워크 관리</MenuItem>
                <MenuItem value='프로젝트 관리'>프로젝트 관리</MenuItem>
                <MenuItem value='기술 지원'>기술 지원</MenuItem>
                <MenuItem value='기술 마케팅'>기술 마케팅</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 4 }}>
              <InputLabel htmlFor='auth-register-password'>비밀번호</InputLabel>
              <OutlinedInput
                label='비밀번호'
                value={values.password}
                id='auth-register-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-register-password'>비밀번호 확인</InputLabel>
              <OutlinedInput
                label='비밀번호 확인'
                value={values.confirmPassword}
                id='auth-register-password'
                onChange={handleChange('confirmPassword')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Fragment>
                  <Link href='/' passHref>
                    <LinkStyled onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                      이용약관
                    </LinkStyled>
                  </Link>
                  <span>에 동의합니다.</span>
                </Fragment>
              }
            />
            <Button fullWidth size='large' type='submit' variant='contained' sx={{ marginBottom: 7 }}>
              Sign up
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                이미 계정이 있으신가요?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/pages/login'>
                  <LinkStyled>로그인</LinkStyled>
                </Link>
              </Typography>
            </Box>
            <Divider sx={{ my: 5 }}>or</Divider>
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
    </Box>
  )
}

RegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
