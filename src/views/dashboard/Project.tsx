import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import LatestRelease from './detail/LatestRelease';
import MyIssue from './detail/MyIssue';
// import Status from './detail/Status';

interface DataType {
  id: number;
  title: string;
}

const projectData: DataType = {
  id: 1,
  title: "project1",
};

const Project = () => {
  return (
    <Card>
      <CardHeader
        title={projectData.title}
        sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
        action={<Typography variant='caption'>View detail</Typography>}
        titleTypographyProps={{
          variant: 'h6',
          sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' },
        }}
      />
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <LatestRelease />
        <MyIssue />
        {/* <Status /> */}
      </CardContent>
    </Card>
  );
}

export default Project;
