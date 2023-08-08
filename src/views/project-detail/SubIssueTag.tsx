// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiDivider, { DividerProps } from '@mui/material/Divider'
import CardMedia from '@mui/material/CardMedia'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import AvatarGroup from '@mui/material/AvatarGroup'
import IconButton from '@mui/material/IconButton'
import PlusThick from 'mdi-material-ui/PlusThick'
import Cog from 'mdi-material-ui/CogOutline'
import { blue } from '@mui/material/colors'
import StatusTag, { Status } from "./StatusTag"

interface DataType {
  title: string
  name: string
}

const issueData = [
  {
    title: "버그 수정",
    name: "이서빈"
  },
  {
    title: "xyz API 개발",
    name: "이서빈"
  },
  {
    title: "기능 A 수정",
    name: "이서빈"
  }
]

const Divider = styled(MuiDivider)<DividerProps>(({ theme }) => ({
  margin: theme.spacing(5, 0),
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    borderRight: 'none',
    margin: theme.spacing(0, 5),
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

const SubIssueTag = () => {
  return (
    <Card sx={{ p: 3, m: 2, backgroundColor: "#e0f2ff" }}>
      {issueData.map((item: DataType, index: number) => {
        return (
          <Card sx={{ position: 'relative', mb: 2, alignItems: 'center' }}>
            <CardContent
              sx={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: "center"
              }}>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography >{item.title}</Typography>
                </Box>
                <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <Avatar src='/images/avatars/8.png' alt='Alice Cobb' />
                  <IconButton style={{ borderRadius: 10, padding: 8 }}>
                    <StatusTag status={Status.InProgress} />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>)
      })}
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <IconButton style={{ borderRadius: 10 }}>
          <PlusThick />
        </IconButton>
        <Box sx={{ paddingTop: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography >하위 이슈 추가</Typography>
        </Box></Box>
    </Card>
  )
}

export default SubIssueTag
