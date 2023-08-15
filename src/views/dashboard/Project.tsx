// ** React Imports
import React, { useState, useEffect } from 'react'
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

import LatestRelease from './detail/LatestRelease';
import MyIssue from './detail/MyIssue';
import ProjectStatus from './detail/ProjectStatus';

// ** Styled Components
const CardWrapper = styled(Box)<BoxProps>({
  width: '33%',
  height:500
})

interface ProjectInfo {
  projectName: string
  projectId: string
}

const Project = () => {
  const router = useRouter();
  const { accessToken } = useRecoilValue(tokensState)
  const loginUser = useRecoilValue(loginUserState)
  const email = loginUser.email;
  const headers = { Authorization: `Bearer ${accessToken}` }
  const [ projects,setProjects ] = useState<ProjectInfo[]>([])

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

  return (
    <>
      {projects.map((project) => (
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
              <LatestRelease />
            </CardWrapper>
            <CardWrapper>
              <MyIssue />
            </CardWrapper>
            <CardWrapper>
              <ProjectStatus />
            </CardWrapper>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default Project;