// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Box from '@mui/material/Box'

const createData = (releaseNoteId: number, version: string, releaseTitle: string, changeItems: ChangeItem[], status: Status, creationDate: string) => {
  return { releaseNoteId, version, releaseTitle, changeItems, status, creationDate }
}

enum Category {
  Feature = 'Feature',
  Changed = 'Changed',
  Deprecated = 'Deprecated',
  Fixed = 'Fixed'
}

interface ChangeItem {
  category: Category,
  releaseContent: string
}

enum Status {
  NotStarted = '미시작',
  InProgress = '진행중',
  Completed = '완료'
}

const rows = [
  createData(4, 'v 1.2.1', 'BB 기능 추가 및 변경', [{ category: Category.Feature, releaseContent: 'bb 기능 - 기능 설명' }, { category: Category.Changed, releaseContent: '타입 변경' }], Status.InProgress, '2023.06.30'),
  createData(3, 'v 1.1.2', 'OO 서비스 중단', [{ category: Category.Deprecated, releaseContent: '~API 중단' }], Status.Completed, '2023.06.29'),
  createData(4, 'v 1.1.1', 'AA 기능 수정 및 버그 해결', [{ category: Category.Fixed, releaseContent: '~ 연동 안되는 버그 수정' }, { category: Category.Changed, releaseContent: '~ 성능 개선' }], Status.Completed, '2023.06.26'),
  createData(4, 'v 1.0.0', '문서 최초 생성', [{ category: Category.Feature, releaseContent: '신규 기능 추가 / AA 기능 제공' }], Status.Completed, '2023.06.20')
]


const ProjectTable = () => {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='project detail table'>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell align='left'>버전</TableCell>
            <TableCell align='left'>변경사항</TableCell>
            <TableCell align='left'>작업상태</TableCell>
            <TableCell align='left'>날짜</TableCell>
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
                <Box><strong>{row.releaseTitle}</strong></Box>
                {row.changeItems.map((item, index) => (
                  <Box key={index}>
                    {Category[item.category]}: {item.releaseContent}
                  </Box>
                ))}
              </TableCell>
              <TableCell align='left'>{row.status}</TableCell>
              <TableCell align='left'>{row.creationDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProjectTable
