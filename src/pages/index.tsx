// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// **Components Imports
import Project from 'src/views/dashboard/Project'

const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Project/>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
