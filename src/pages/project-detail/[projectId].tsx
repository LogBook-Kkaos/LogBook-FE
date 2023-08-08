
// ** React Imports
import { SyntheticEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** HTTP Client
import axios from 'axios'

import { useRecoilValue } from 'recoil'
import { tokensState } from 'src/recoil/auth/atoms'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
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
import TabReleaseNote from 'src/views/project-detail/TabReleaseNote'
import TabDocument from 'src/views/project-detail/TabDocument'
import TabIssue from 'src/views/project-detail/TabIssue'
import TabIssueDetail from 'src/views/project-detail/TabIssueDetail'


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
interface ProjectInfo{
  projectName: string
  projectDescription?: string
  isPublic?: string
  memberCount?: number
}

const ProjectDetail = () => {

  const router = useRouter();
  const {projectId} = router.query;

  const handleCreateReleaseNote = () => {
    console.log('create release note')
    router.push('/create-release-note')
  }

  const [value, setValue] = useState<string>('issue')
  const [project, setProject] = useState<ProjectInfo>();
  const { accessToken } = useRecoilValue(tokensState)
  
  const headers = { Authorization: `Bearer ${accessToken}` }

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  useEffect(() => {
    const fetchProjectInfo = async () => {
      try {
        const response = await axios.get(`/api/projects/${projectId}`,{headers});
        setProject(response.data.result)
      } catch (error) {
        console.error('Error fetching project information:', error);
      }
    };

    if (projectId) {
      fetchProjectInfo();
    }
  }, [projectId]);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          {project?.projectName}
        </Typography>
        <Typography variant='body2' style={{paddingTop:5}}>{project?.projectDescription}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid>
          </Grid>
          <Grid>
            <IconButton style={{ border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: 10, padding: 8, marginRight: 16 }}>
              <Cog />
            </IconButton>
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <TabList
                onChange={handleChange}
                aria-label='project-detail tabs'
                sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, flexGrow: 1 }}
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
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: 1,
                  mb: 1,
                  borderRadius: 1,
                  marginLeft: 'auto'
                }}
                onClick={handleCreateReleaseNote}
              >
                릴리즈 노트 작성하기
              </Button>
            </Box>
            <TabPanel sx={{ p: 0 }} value='issue'>
              <TabIssueDetail />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='release-note'>
              <TabReleaseNote />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='document'>
              <TabDocument />
            </TabPanel>
        </TabContext>
      </Grid>
    </Grid>
  )
}

export default ProjectDetail