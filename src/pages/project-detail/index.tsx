
// ** React Imports
import { SyntheticEvent, useState } from 'react'

import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import Cog from 'mdi-material-ui/cog'
import Sort from 'mdi-material-ui/sort'
import Filter from 'mdi-material-ui/filter'
import Magnify from 'mdi-material-ui/Magnify'
import LightbulbOnOutline from 'mdi-material-ui/LightbulbOnOutline'
import NoteAlertOutline from 'mdi-material-ui/NoteAlertOutline'
import FileRefreshOutline from 'mdi-material-ui/FileRefreshOutline'


// ** Components Imports
import ProjectTable from 'src/views/project-detail/ProjectTable'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import TabAccount from 'src/views/account-settings/TabAccount'


const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))


const ProjectDetail = () => {


  const router = useRouter();

  const handleCreateReleaseNote = () => {
    console.log('create release note')
    router.push('/create-release-note')
  }

  const [value, setValue] = useState<string>('issue')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          Project 1
        </Typography>
        <Typography variant='body2'>This is the project description.</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid>
            <Button variant="contained" color="primary" style={{ marginRight: 16, borderRadius: 10 }} onClick={handleCreateReleaseNote}>
              릴리즈 노트 작성하기
            </Button>
            <IconButton style={{ border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: 10, padding: 8 }}>
              <Cog />
            </IconButton>
          </Grid>
          <Grid>
            <IconButton style={{ border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: 10, padding: 8, marginRight: 16 }}>
              <Sort />
            </IconButton>
            <IconButton style={{ border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: 10, padding: 8, marginRight: 16 }}>
              <Filter />
            </IconButton>
            <TextField
              size='small'
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
              placeholder='Search'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Magnify fontSize='small' />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label='project-detail tabs'
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          >
            <Tab
              value='issue'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LightbulbOnOutline />
                  <TabName>이슈</TabName>
                </Box>
              }
            />
            <Tab
              value='release-note'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <NoteAlertOutline />
                  <TabName>릴리즈 노트</TabName>
                </Box>
              }
            />
            <Tab
              value='document'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FileRefreshOutline />
                  <TabName>기술 문서</TabName>
                </Box>
              }
            />
          </TabList>

          <TabPanel sx={{ p: 0 }} value='issue'>
            <TabAccount />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='release-note'>
            <ProjectTable />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='document'>
            <TabInfo />
          </TabPanel>
        </TabContext>
      </Grid>
    </Grid>
  )
}

export default ProjectDetail