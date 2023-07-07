// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiDivider, { DividerProps } from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress'


interface DataType {
  title: string
  start_date: Date
  end_date: Date
  status: string


}

//나중에 서버에서 내가 당담인 issue data받아서 넣기
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

const MyIssue = () => {
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
          {issueData.map((item: DataType, index: number) => {
            return (
              <Box
                key={item.title}
                sx={{ display: 'flex', alignItems: 'center', mb: index !== issueData.length - 1 ? 6 : 0 }}
              >
                <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'center' }}>
                <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.title}</Typography>
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
                        {item.start_date.toLocaleDateString()}~{item.end_date.toLocaleDateString()}
                    </Typography>
                    <Typography variant='caption'>{item.status}</Typography>
                </Box>
              </Box>
            )
          })}
          <Divider flexItem />
          <Box sx={{ marginTop:2, minWidth: 85, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='body2' sx={{ mb: 2, fontWeight: 700, color: 'text.primary' }}>
                        진행률({`${(issueData.filter(item => item.status === "완료").length / issueData.length * 100).toFixed(0)}%`})
                    </Typography>
                  <LinearProgress color={'primary'} value={issueData.filter(item => item.status === "완료").length/issueData.length*100} variant='determinate' />
                </Box>
        </CardContent>
      </Box>
    </Card>
  )
}

export default MyIssue
