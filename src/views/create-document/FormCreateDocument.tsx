import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Divider from '@mui/material/Divider'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import Update from 'mdi-material-ui/Update'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'

// ** Custom Components
import CategoryTag, { Category } from 'src/views/create-document/CategoryTag'
import StatusTag, { Status } from 'src/views/create-document/StatusTag'




const FormCreateDocument = () => {
  const [textfieldValue, setTextfieldValue] = useState('')
  const [categoryTag, setCategoryTag] = useState('')

  useEffect(() => {
    if (textfieldValue.toLowerCase().includes('feature')) {
      setCategoryTag('Feature');
    } else {
      setCategoryTag('');
    }
  }, [textfieldValue]);


  return (
    <Card>
      <CardHeader title='BB 기능 추가 및 변경' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='작성자'
                placeholder='작성자를 입력해주세요...'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='version'
                label='버전'
                placeholder='v x.y.z'
                helperText='Major 업데이트의 경우 x를, Minor 업데이트의 경우 y를, Patch 업데이트의 경우 z를 바꿔주세요.'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Update />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label='작성날짜'
                  inputFormat='yyyy-MM-dd'
                  mask='____-__-__'
                  value='2023.06.30'
                  onChange={() => { }}
                  renderInput={params => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select label='Status' defaultValue="시작 전">
                  <MenuItem value='NotStarted'><StatusTag status="시작 전" /></MenuItem>
                  <MenuItem value='InProgress'><StatusTag status="진행중" /></MenuItem>
                  <MenuItem value='Done'><StatusTag status="완료" /></MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12}>
              <Button type='submit' variant='contained' size='large'>
                Submit
              </Button>
            </Grid> */}

            <Divider sx={{ margin: 0 }} />
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label={categoryTag || '변경사항'}
                value={textfieldValue}
                onChange={(e) => setTextfieldValue(e.target.value)}
                placeholder='변경사항을 작성해주세요...'
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MessageOutline />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormCreateDocument