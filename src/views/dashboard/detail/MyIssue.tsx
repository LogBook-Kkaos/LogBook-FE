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

interface MyIssueProps {
  projectId: string
  headers: any
  userName: string | null
}

interface MyIssueInfo {
  issueId: string
  issueTitle: string
  startDate: Date
  endDate: Date
  status: string
}

interface DataType {
  title: string
  start_date: Date
  end_date: Date
  status: string
}

const issueData = [
  {
    title: "할일1",
    start_date: new Date("2023-07-01"),
    end_date: new Date("2023-07-10"),
    status: "진행중"
  },
  {
    title: "할일2",
    start_date: new Date("2023-07-01"),
    end_date: new Date("2023-07-10"),
    status: "진행중"
  },
  {
    title: "할일3",
    start_date: new Date("2023-07-01"),
    end_date: new Date("2023-07-10"),
    status: "완료"
  }
]

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

        const formattedMyIssues = sortedIssues.map((item: any) => ({
          issueId: item.issueId,
          issueTitle: item.issueTitle,
          startDate: item.startDate,
          endDate: item.endDate,
          status: item.status
        }));
        
        setMyIssues(formattedMyIssues);
        
      } catch (error) {
        console.error('Error fetching myissue information:', error);
      }
    };
      fetchData();
  }, [projectId])

  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: ['column', 'column', 'row'], height:'100%' }}>
      <Box sx={{ width: '100%' }}>
        <CardHeader
          title='내 할일'
          sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          action={<Typography variant='caption'>View All</Typography>}
          titleTypographyProps={{
            variant: 'h6',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }}
        />
        <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
          {myIssues.map((item: MyIssueInfo, index: number) => {
            return (
              <Box
                key={item.issueId}
                sx={{ display: 'flex', alignItems: 'center', mb: index !== issueData.length - 1 ? 6 : 0 }}
              >
                <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'center' }}>
                <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.issueTitle}</Typography>
                </Box>
                <Box
                  sx={{
                    ml: 4,
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      {item.startDate.toLocaleDateString()}~{item.endDate.toLocaleDateString()}
                  </Typography>
                  <Typography variant='caption'>{item.status}</Typography>
                </Box>
              </Box>
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
