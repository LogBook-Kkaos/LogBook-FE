// ** React Imports
import { useState, Fragment, ChangeEvent, MouseEvent, ReactNode, FormEvent } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'

// ** HTTP Client
import axios from 'axios'

// ** Recoil Import
import { useRecoilState } from 'recoil'
import { userState } from 'src/recoil/user/atoms'


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
import FormHelperText from '@mui/material/FormHelperText'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

interface formData {
  username: string
  email: string
  department: string
  password: string
  confirmPassword: string

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

const departments = [
  "소프트웨어 개발",
  "서버/인프라 기술",
  "데이터베이스 관리",
  "품질 보증/테스트",
  "사용자 경험/사용자 인터페이스 디자인",
  "IT 보안",
  "네트워크 관리",
  "프로젝트 관리",
  "기술 지원",
  "기술 마케팅",
];


const RegisterPage = () => {

  const [user, setUser] = useRecoilState(userState);
  const [terms, setTerms] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm<formData>();

  const onSubmit: SubmitHandler<formData> = (data) => {
    axios.post('/api/user/register', data)
      .then((res) => {
        console.log(res);
        setUser({
          ...user,
          username: data.username,
          email: data.email,
          department: data.department,
          password: data.password
        })
      }
      )
  }

  const onError = (errors: any) => {
    console.log(errors);
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 30, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* 로고 눌렀을때 로그인 여부 확인하여 이동 */}
            <Link href='/' passHref>
              <LogoLinkStyled>
                <Image src="/images/LogBook_Logo_horizontal.svg" alt="Logo" width={250} height={100} />
              </LogoLinkStyled>
            </Link>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              처음 만나는 릴리즈 노트 시스템 👋
            </Typography>
            <Typography variant='body2'>릴리즈 노트를 쉽게 작성해보세요.</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit, onError)}>
            <TextField autoFocus fullWidth id='username' label='이름' sx={{ marginBottom: 4 }}
              {...register("username", {
                required: '이름을 입력해주세요.',
                minLength: {
                  value: 2,
                  message: "이름은 2글자 이상이어야 합니다.",
                },
                maxLength: {
                  value: 10,
                  message: "이름은 10글자 이하여야 합니다.",
                },
                pattern: {
                  value: /^[가-힣a-zA-Z]+$/,
                  message: "한글과 영문 대소문자를 사용하세요.",
                },
              })}
              error={!!errors.username}
              helperText={errors.username ? errors.username.message : ""} />
            <TextField fullWidth type='email' label='이메일' sx={{ marginBottom: 4 }}
              {...register("email", {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[a-zA-Z0-9]+(?:[-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[A-Za-z]+$/,
                  message: "이메일 형식이 올바르지 않습니다.",
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""} />
            <FormControl fullWidth>
              <InputLabel id='form-layouts-separator-select-label'>소속 / 부서명</InputLabel>
              <Select
                label='소속 / 부서명'
                defaultValue=''
                id='form-layouts-separator-select'
                labelId='form-layouts-separator-select-label'
                sx={{ marginBottom: 4 }}
                {...register("department")}
              >
                {departments.map((department) => (
                  <MenuItem key={department} value={department}>
                    {department}
                  </MenuItem>
                ))}

              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 4 }}>
              <InputLabel htmlFor='auth-register-password'>비밀번호</InputLabel>
              <OutlinedInput
                label='비밀번호'
                id='auth-register-password'
                {...register("password", {
                  required: '비밀번호를 입력해주세요.',
                  minLength: {
                    value: 8,
                    message: "비밀번호는 8글자 이상이어야 합니다.",
                  },
                  maxLength: {
                    value: 20,
                    message: "비밀번호는 20글자 이하여야 합니다.",
                  },
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/,
                    message: "영문, 숫자, 특수문자를 포함하여 8~20자리로 입력하세요.",
                  }
                })}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleShowPassword}
                      aria-label='toggle password visibility'
                    >
                      {showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
                error={!!errors.password}
              />
              {errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-register-password'>비밀번호 확인</InputLabel>
              <OutlinedInput
                label='비밀번호 확인'
                id='auth-register-password'
                {...register("confirmPassword", {
                  required: '비밀번호가 일치하지 않습니다.',
                  minLength: 8,
                  maxLength: 20,
                  validate: (value: string) => {
                    if (watch("password") !== value) {
                      return "비밀번호가 일치하지 않습니다.";
                    }
                  },
                })}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleShowPassword}
                      aria-label='toggle password visibility'
                    >
                      {showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
                error={!!errors.confirmPassword}
              />
              {errors.confirmPassword && <FormHelperText error>{errors.confirmPassword.message}</FormHelperText>}
            </FormControl>
            <FormControlLabel
              control={<Checkbox onChange={(event) => setTerms(event.target.checked)} checked={terms} />}
              label={
                <Fragment>
                  <Link href='/' passHref>
                    <LinkStyled onClick={(event: MouseEvent<HTMLElement>) => event.preventDefault()}>
                      이용약관
                    </LinkStyled>
                  </Link>
                  <span>에 동의합니다.</span>
                </Fragment>
              }
            />
            <Button fullWidth size='large' type='submit' variant='contained' disabled={!terms} sx={{ marginBottom: 7 }}>
              회원가입
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
