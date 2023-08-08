// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiDivider, { DividerProps } from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import PlusThick from 'mdi-material-ui/PlusThick'
import Cog from 'mdi-material-ui/CogOutline'
import { styled } from '@mui/material/styles'

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

const IssueTag = () => {
  return (
    <Card sx={{ p: 3, m: 2, backgroundColor: "#e0f2ff" }}>
      <CardHeader
        title='할 일'
        sx={{ pt: 2.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
        titleTypographyProps={{
          variant: 'h6',
          sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
        }}
      />
      {issueData.map((item: DataType, index: number) => {
        return (
          <Card sx={{ position: 'relative', mb: 2 }}>
            <CardContent>
              <Box
                sx={{
                  mt: 2,
                  mb: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography >{item.title}</Typography>
                </Box>
                <IconButton style={{ borderRadius: 10, padding: 8 }}>
                  <Cog />
                </IconButton>
              </Box>
              <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Avatar src='/images/avatars/8.png' alt='Alice Cobb' />
              </Box>
            </CardContent>
          </Card>)
      })}
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <IconButton style={{ borderRadius: 10 }}>
          <PlusThick />
        </IconButton>
        <Box sx={{ paddingTop: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography >이슈 추가</Typography>
        </Box></Box>
    </Card>
  )
}

export default IssueTag
