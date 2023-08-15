// ** React Imports
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** HTTP Client
import axios from 'axios'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { PieChart, Pie, Cell, Legend } from 'recharts'


interface ProjectStatusProps{
  projectId: string
  headers: any
}
interface graphData{
  name: string
  value: number
}

const ProjectStatus : React.FC<ProjectStatusProps> = ({ projectId, headers }) => {
  const router = useRouter()
  const [ graphData, setGraphData ] = useState<graphData[]>([])
  const colors = ['#8884d8', '#82ca9d', '#ffc658'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const IssuesResponse = await axios.get(`/api/projects/${projectId}/issues`, { headers });
        const issues: any[] = IssuesResponse.data.result;

        const totalCount = issues.length;
        const todoCount = issues.filter(item => item.status === '할일').length;
        const inProgressCount = issues.filter(item => item.status === '진행중').length;
        const doneCount = issues.filter(item => item.status === '완료').length;

        const todoRatio = totalCount > 0 ? todoCount / totalCount : 0;
        const inProgressRatio = totalCount > 0 ? inProgressCount / totalCount : 0;
        const doneRatio = totalCount > 0 ? doneCount / totalCount : 0;

        const data: graphData[] = [
          { name: '할일', value: todoRatio },
          { name: '진행중', value: inProgressRatio },
          { name: '완료', value: doneRatio }
        ];

        setGraphData(data);
        
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
    <Card sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: ['column', 'column', 'row'], height: '100%' }}>
      <Box sx={{ width: '100%' }}>
        <CardHeader
          title='프로젝트 진행률'
          sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.2 } }}
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
        <CardContent sx={{ pb: theme => `${theme.spacing(2)} !important` }}>
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
           <div>
            <PieChart width={400} height={400}>
              <Pie
                  data={graphData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  label
                >
                  {graphData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Legend
                      layout="horizontal"
                      align="center"
                      verticalAlign="bottom"
                      iconType="circle"
                      iconSize={12}
                      formatter={(value, entry, index) => <span style={{ color: colors[index] }}>{value}</span>}
                    />
              </PieChart>
            </div>
          </Box>
        </CardContent>
      </Box>
    </Card>
  )
}

export default ProjectStatus
