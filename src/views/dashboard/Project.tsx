// ** React Imports
import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

// ** HTTP Client
import axios from 'axios'

import { useRecoilValue } from 'recoil'
import { tokensState } from 'src/recoil/auth/atoms'
import { loginUserState } from 'src/recoil/user/atoms'

import Box, {BoxProps} from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'

import AddProjectPopup from '../add-project/AddProjectPopup'
import LatestRelease from './detail/LatestRelease';
import MyIssue from './detail/MyIssue';
import ProjectStatus from './detail/ProjectStatus';

import Plus from 'mdi-material-ui/Plus'

// ** Styled Components
const CardWrapper = styled(Box)<BoxProps>({
  width: '33%',
  height: 400
})

interface ProjectInfo {
  projectName: string
  projectId: string
}

const Project = () => {
  const router = useRouter()
  const { accessToken } = useRecoilValue(tokensState)
  const loginUser = useRecoilValue(loginUserState)
  const userName = loginUser.userName
  const email = loginUser.email
  const headers = { Authorization: `Bearer ${accessToken}` }
  const [ projects,setProjects ] = useState<ProjectInfo[]>([])

  const [isOpen, setIsOpen] = useState(false)

    const handlePopupToggle = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectResponse = await axios.get(`/api/users/myproject`, { headers, params: { email } });
        const sortedProjects = projectResponse.data.result.slice().sort((a:any, b:any) => a.projectName.localeCompare(b.projectName));
        setProjects(sortedProjects);
        
        
      } catch (error) {
        console.error('Error fetching project information:', error);
      }
    };
      fetchData();
  }, [])

  const handleViewDetail = (projectId : any) => {
    router.push(`/project-detail/${projectId}`);
  }

  const IconButtonStyle = {
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: 10,
    padding: 8,
    marginLeft: 5
  };

  return (
    <>
      {projects.length === 0 ? (
        <>
        <Card sx={{height:150, width:'100%'}}>
          <CardContent
            sx={{
              justifyContent: 'space-between',
              gap: '0rem',
            }}
          >
            <Typography variant="h6">내가 참여한 프로젝트가 없습니다.</Typography>
            <Box sx={{display:'flex', alignItems:'center', mt:5}}>
              <IconButton 
                onClick={handlePopupToggle}
                style={IconButtonStyle}
              >
                <Plus />
              </IconButton>
              <Typography variant="body1" sx={{ml:3}}>프로젝트 요약정보를 확인하려면 새로운 프로젝트를 생성하세요!</Typography>          
            </Box>
          </CardContent>
        </Card>
        <AddProjectPopup
          isOpen={isOpen}
          onClose={handlePopupToggle}
          />
        </>
      ) : (projects.map((project) => (
        <Card
          key={project.projectId}
          sx={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}
        >
          <CardHeader
            title={project.projectName}
            sx={{
              pt: 5.5,
              alignItems: 'center',
              '& .MuiCardHeader-action': { mt: 0.6 },
            }}
            action={
              <Typography
                variant='caption'
                onClick={() => handleViewDetail(project.projectId)}
                style={{ cursor: 'pointer' }}
              >
                View detail
              </Typography>
            }
            titleTypographyProps={{
              variant: 'h6',
              sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' },
            }}
          />
          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '0rem',
              alignItems: 'stretch',
            }}
          >
            <CardWrapper>
              <LatestRelease projectId={project.projectId} headers={headers}/>
            </CardWrapper>
            <CardWrapper>
              <MyIssue projectId={project.projectId} headers={headers} userName={userName}/>
            </CardWrapper>
            <CardWrapper>
              <ProjectStatus projectId={project.projectId} headers={headers}/>
            </CardWrapper>
          </CardContent>
        </Card>
      ))
      )}
    </>
  );
}

export default Project;