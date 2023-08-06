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
import Cog from 'mdi-material-ui/CogOutline'

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
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        {issueData.map((item: DataType, index: number) => {
          return (
            <>
              <Box
                sx={{
                  mt: 2.75,
                  mb: 8.75,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='h6'>{item.title}</Typography>
                </Box>
                <IconButton style={{ borderRadius: 10, padding: 8 }}>
                  <Cog />
                </IconButton>
              </Box>
              <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Avatar src='/images/avatars/8.png' alt='Alice Cobb' />
              </Box>
            </>)
        })}
      </CardContent>
    </Card>
    // <Card sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: ['column', 'column', 'row'], height:'100%' }}>
    //   <Box sx={{ width: '100%' }}>
    //     <CardHeader
    //       title='할 일'
    //       sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
    //       action={<Typography variant='caption'>View All</Typography>}
    //       titleTypographyProps={{
    //         variant: 'h6',
    //         sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
    //       }}
    //     />
    //     <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
    //       {issueData.map((item: DataType, index: number) => {
    //         return (
    //           <Box
    //             key={item.title}
    //             sx={{ display: 'flex', alignItems: 'center', mb: index !== issueData.length - 1 ? 6 : 0 }}
    //           >
    //             <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'center' }}>
    //             <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.title}</Typography>
    //             </Box>
    //             <Box
    //               sx={{
    //                 ml: 4,
    //                 width: '100%',
    //                 display: 'flex',
    //                 flexWrap: 'wrap',
    //                 alignItems: 'center',
    //                 justifyContent: 'space-between'
    //               }}
    //             >
    //               <Typography variant='caption'>{item.name}</Typography>
    //             </Box>
    //           </Box>
    //         )
    //       })}
    //     </CardContent>
    //   </Box>
    // </Card>
  )
}

export default IssueTag
