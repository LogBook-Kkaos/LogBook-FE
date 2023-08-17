// ** React Imports
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** HTTP Client
import axios from 'axios'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiDivider, { DividerProps } from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress'
import Grid from '@mui/material/Grid'

import StatusTag, {Status} from 'src/views/project-detail/StatusTag'
interface MyIssueProps {
  projectId: string
  headers: any
  userName: string | null
}

interface MyIssueInfo {
  issueId: string
  issueTitle: string
  startDate: string
  endDate: string
  status: Status
}

// Styled Divider component
const Divider = styled(MuiDivider)<DividerProps>(({ theme }) => ({
    margin: theme.spacing(5, 0),
    borderRight: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('md')]: {
      borderRight: 'none',
      margin: theme.spacing(0, 5),
      borderBottom: `1px solid ${theme.palette.divider}`
    }
  }))

const MyIssue: React.FC<MyIssueProps> = ({ projectId, headers, userName }) => {
  
  const router = useRouter()
  const [ myIssues, setMyIssues ] = useState<MyIssueInfo[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = { assigneeName: userName };
        const MyIssueResponse = await axios.get(`/api/projects/${projectId}/issues/filter`, {
          headers: headers,
          params: params
        });

        const sortedIssues = MyIssueResponse.data.result.sort((a:any, b:any) => {
          const endDateA = new Date(a.endDate);
          const endDateB = new Date(b.endDate);
          if (endDateA < endDateB) return -1;
          if (endDateA > endDateB) return 1;
      
          const statusOrder = ['할일', '진행중', '완료'];
          const statusIndexA = statusOrder.indexOf(a.status);
          const statusIndexB = statusOrder.indexOf(b.status);
          if (statusIndexA < statusIndexB) return -1;
          if (statusIndexA > statusIndexB) return 1;
      
          if (a.issueTitle < b.issueTitle) return -1;
          if (a.issueTitle > b.issueTitle) return 1;
      
          return 0;
        });

        const formattedMyIssues = sortedIssues.slice(0, 3).map((item: any) => ({
          issueId: item.issueId,
          issueTitle: item.issueTitle,
          startDate: item.startDate ? new Date(item.startDate).toISOString().split('T')[0] : '',
          endDate: item.endDate ? new Date(item.endDate).toISOString().split('T')[0] : '',
          status: item.status
        }));
        
        setMyIssues(formattedMyIssues);
        
      } catch (error) {
        console.error('Error fetching myissue information:', error);
      }
    };
      fetchData();
  }, [projectId])

  const handleViewAll = (projectId : any) => {
    router.push(`/project-detail/${projectId}`);
  }

  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: ['column', 'column', 'row'], height:'100%' }}>
      <Box sx={{ width: '100%' }}>
        <CardHeader
          title='내 할일'
          sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          action={
            <Typography
              variant='caption'
              onClick={() => handleViewAll(projectId)}
              style={{ cursor: 'pointer' }}>
              View All
            </Typography>
          }
          titleTypographyProps={{
            variant: 'h6',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }}
        />
        <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
          {myIssues.map((item: MyIssueInfo, index: number) => {
            return (
              <Grid
                key={item.issueId}
                container
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  mb: index !== myIssues.length - 1 ? 6 : 0,
                  borderBottom: index !== myIssues.length - 1 ? '1px solid rgba(0, 0, 0, 0.12)' : 'none',
                  paddingBottom: index !== myIssues.length - 1 ? 6 : 0
                }}
              >
                <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <StatusTag status={item.status} />
                </Grid>
                <Grid item xs={4}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', ml: 2 }}>
                    {item.issueTitle}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', textAlign: 'right' }}>
                    {item.startDate} ~ {item.endDate}
                  </Typography>
                </Grid>
              </Grid>
            )
          })}
          <Divider flexItem/>
          <Box sx={{ marginTop: 2, minWidth: 85, display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body2' sx={{ mb: 2, fontWeight: 700, color: 'text.primary' }}>
              진행률({`${((myIssues.filter(item => item.status === "완료").length / myIssues.length * 100) || 0).toFixed(0)}%`})
            </Typography>
            <LinearProgress
              color={'primary'}
              value={(myIssues.filter(item => item.status === "완료").length / myIssues.length * 100) || 0}
              variant='determinate'
            />
          </Box>
        </CardContent>
      </Box>
    </Card>
  )
}

export default MyIssue
