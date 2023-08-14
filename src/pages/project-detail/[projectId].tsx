// ** React Imports
import { SyntheticEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** HTTP Client
import axios from 'axios'

import { useRecoilValue } from 'recoil'
import { tokensState } from 'src/recoil/auth/atoms'
import { activeView } from 'src/recoil/issue/atom'
import { loginUserState } from 'src/recoil/user/atoms'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import Cog from 'mdi-material-ui/cog'
import LightbulbOnOutline from 'mdi-material-ui/LightbulbOnOutline'
import NoteAlertOutline from 'mdi-material-ui/NoteAlertOutline'
import FileRefreshOutline from 'mdi-material-ui/FileRefreshOutline'

// ** Components Imports
import TabReleaseNote from 'src/views/project-detail/TabReleaseNote'
import TabDocument from 'src/views/project-detail/TabDocument'
import TabIssue from 'src/views/project-detail/TabIssue'
import TabIssueDetail from 'src/views/project-detail/TabIssueDetail'
import TabCreateIssue from 'src/views/project-detail/TabCreateIssue'
import SettingPopup from 'src/views/project-detail/SettingPopup'

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

interface ProjectInfo {
  projectName: string
  projectDescription?: string
  isPublic?: string
  memberCount?: number
}

const ProjectDetail = () => {

  const router = useRouter();
  const { projectId } = router.query;
  const activeIssueTab = useRecoilValue(activeView);
  const [issueData, setIssueData] = useState<{ title: string; name: string; }[]>([])
  const [activeTab, setActiveTab] = useState<string>('issue')
  const [project, setProject] = useState<ProjectInfo>()
  const { accessToken } = useRecoilValue(tokensState)
  const loginUser = useRecoilValue(loginUserState)
  const [isOpenSetting, setIsOpenSetting] = useState(false)
  const [isLeader, setIsLeader] = useState(false)
  const [permissionLevel, setPermissionLevel] = useState('')

  const headers = { Authorization: `Bearer ${accessToken}` }

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setActiveTab(newValue)
  }

  const openSetting = () => {
    setIsOpenSetting(true)
  }

  const closeSetting = () => {
    setIsOpenSetting(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectResponse = await axios.get(`/api/projects/${projectId}`, { headers });
        setProject(projectResponse.data.result)

        const userPermissionResponse = await axios.get(`/api/projects/${projectId}/members/permission?email=${loginUser.email}`, { headers });
        const userPermissionLevel = userPermissionResponse.data.result.permissionLevel;
        setPermissionLevel(userPermissionLevel);

        if (userPermissionLevel === '관리자') {
          setIsLeader(true);  
        } else{
          setIsLeader(false);
        }
      } catch (error) {
        console.error('Error fetching project information:', error);
      }
    };

    if (projectId) {
      fetchData();
    }
  }, [projectId]);
  

  //style component
  const IconButtonStyle = {
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: 10,
    padding: 8,
    marginLeft: 16
  };

  const handleIssueCreate = (issueTitle: string) => {
    setIssueData([...issueData, { title: issueTitle, name: '이서빈' }]);
  };

  return (

    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Grid sx={{display:'flex', alignItems:'center'}}>
        <Typography variant='h5'>
          {project?.projectName}
        </Typography>
        {isLeader && (
          <IconButton 
            onClick={openSetting}
            style={IconButtonStyle}
          >
            <Cog />
          </IconButton>
        )}
        </Grid>
        <Typography variant='body2' style={{ paddingTop: 5 }}>{project?.projectDescription}</Typography>
      </Grid>
      <SettingPopup isOpen={isOpenSetting} onClose={closeSetting} projectId={projectId} token={accessToken}/>
      <Grid item xs={12}>
        <TabContext value={activeTab}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <TabList
              onChange={handleChange}
              aria-label='project-detail tabs'
              sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`, flexGrow: 1 }}
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
          </Box>
          <TabPanel sx={{ p: 0 }} value='issue'>
            {activeIssueTab === 'issue' && <TabIssue onIssueCreate={handleIssueCreate} issueData={issueData} />}
            {activeIssueTab === 'issueDetail' && <TabIssueDetail />}
            {activeIssueTab === 'createIssue' && <TabCreateIssue onIssueCreate={handleIssueCreate} />}
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='release-note'>
            {projectId && <TabReleaseNote projectId={projectId as string} permissionLevel={permissionLevel}/>}
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='document'>
            {projectId && <TabDocument projectId={projectId as string} permissionLevel={permissionLevel}/>}
          </TabPanel>
        </TabContext>
      </Grid>
    </Grid>

  )
}

export default ProjectDetail