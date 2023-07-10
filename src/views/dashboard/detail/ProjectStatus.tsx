// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

//npm install react-apexcharts apexcharts




const ProjectStatus = () => {
  const data = [
    { name: '완료', value: 30 },
    { name: '진행중', value: 50 },
    { name: '준비중', value: 20 },
  ];

  const colors = ['#8884d8', '#82ca9d', '#ffc658'];
  

  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: ['column', 'column', 'row'] }}>
      <Box sx={{ width: '100%' }}>
        <CardHeader
          title='프로젝트 진행률'
          sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.2 } }}
          action={<Typography variant='caption'>View All</Typography>}
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
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
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
