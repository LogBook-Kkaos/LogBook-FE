// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiDivider, { DividerProps } from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress'
// import CircularProgressBar from "./index";
interface DataType {
  title: string
  start_date: Date
  end_date: Date
  status: string

}

//나중에 서버에서 user가 당담인 issue data받아서 넣기
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
    status: "진행중"
  }
]

const Status = () => {
  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: ['column', 'column', 'row'] }}>
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
            {/* <CircularProgressBar
                    selectedValue={75}
                    maxValue={100}
                    radius={100}
                    activeStrokeColor='#0f4fff'
                    withGradient
                /> */}
            </Box>
        </CardContent>
      </Box>
    </Card>
  )
}

export default Status
