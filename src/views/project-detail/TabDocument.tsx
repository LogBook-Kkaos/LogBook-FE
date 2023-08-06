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
import CategoryTag, { Category } from 'src/views/project-detail/CategoryTag'

const createReleaseNoteData = (releaseNoteId: number, version: string, releaseTitle: string, changeItems: ReleaseContent[]) => {
  return { releaseNoteId, version, releaseTitle, changeItems}
}


interface ReleaseContent {
  category: Category,
  releaseContent: string
}


const rows = [
  createReleaseNoteData(2, '개발 프로세스\n 구분에 대한 설명을 작성합니다.', 'AA 기능 수정 및 버그 해결', [{ category: Category.Fixed, releaseContent: '~ 연동 안되는 버그 수정' }, { category: Category.Changed, releaseContent: '~ 성능 개선' }]),
  createReleaseNoteData(1, 'API 레퍼선스\n구분에 대한 설명을 작성합니다.', '문서 최초 생성', [{ category: Category.Feature, releaseContent: '신규 기능 추가 / AA 기능 제공' }])
]


const TabDocument = () => {

  return (
    <Grid container justifyContent="space-between" alignItems="center">

      <Grid item xs={12}>
        <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 400px)', position: 'relative', marginTop: '10px' }}>
          <Table sx={{ minWidth: 650 }} aria-label='project detail table'>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell align='left'>구분</TableCell>
                <TableCell align='left'>내용</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow
                  key={row.releaseNoteId}
                  sx={{
                    '&:last-of-type td, &:last-of-type th': {
                      border: 0
                    }
                  }}
                >
                  <TableCell component='th' scope='row'>
                    {row.releaseNoteId}
                  </TableCell>
                  <TableCell align='left'>{row.version}</TableCell>
                  <TableCell align='left'>
                    <Typography variant="subtitle2" sx={{ marginBottom: 1 }}><strong>{row.releaseTitle}</strong></Typography>
                    {row.changeItems.map((item, index) => (
                      <Box key={index} sx={{ marginBottom: 1 }}>
                        <CategoryTag category={item.category} />
                        {item.releaseContent}
                      </Box>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default TabDocument
