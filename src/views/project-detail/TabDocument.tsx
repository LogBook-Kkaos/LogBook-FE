// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import CardDocument from './CardDocument'
import UpperButtons from './UpperButtons'


const TabDocument = () => {

  return (
    <Grid container justifyContent="flex-start" spacing={0}>
      <UpperButtons createButtonLabel="기술문서 생성" routerPath="/create-document"/>
      <CardDocument
        imageUrl="https://cdn.inflearn.com/public/courses/328412/cover/4b378968-fcc9-47e7-b08d-a1635551b602/328412-eng-new.png" 
        date="2023-08-08"
        title="문서 제목"
      />
      <CardDocument
        imageUrl="https://b2750956.smushcdn.com/2750956/wp-content/uploads/2021/01/3-31510_svg-kubernetes-logo-hd-png-download-696x664.png?lossy=1&strip=1&webp=1"
        date="2023-08-08"
        title="문서 제목"
      />
      <CardDocument
        imageUrl="https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E"
        date="2023-08-08"
        title="문서 제목"
      />
    </Grid>
  )
}

export default TabDocument
