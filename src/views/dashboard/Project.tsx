import Box, {BoxProps} from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles'

import LatestRelease from './detail/LatestRelease';
import MyIssue from './detail/MyIssue';
import ProjectStatus from './detail/ProjectStatus';
import React, { ReactNode } from 'react';


interface DataType {
  id: number;
  title: string;
}

const projectData: DataType = {
  id: 1,
  title: "project1",
};


// ** Styled Components
const CardWrapper = styled(Box)<BoxProps>({
  width: '33%',
  height:500
})


const Project = () => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={projectData.title}
        sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
        action={<Typography variant='caption'>View detail</Typography>}
        titleTypographyProps={{
          variant: 'h6',
          sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' },
        }}
      />
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', gap: '0rem', alignItems: 'stretch' }}>
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
  );
}

export default Project;