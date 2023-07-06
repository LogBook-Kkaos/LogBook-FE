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

const createData = (releaseNoteId: number, version: string, releaseTitle: string, changeItems: ChangeItem[], status: Status, creationDate: string) => {
  return { releaseNoteId, version, releaseTitle, changeItems, status, creationDate }
}

enum Category {
  Feature = 'Feature',
  Changed = 'Changed',
  Deprecated = 'Deprecated',
  Fixed = 'Fixed'
}

const categoryColors = {
  [Category.Feature]: '#C7E3FE',
  [Category.Changed]: '#FFF8B6',
  [Category.Deprecated]: '#FFC7C7',
  [Category.Fixed]: '#BBFFF3',
}

const categoryTextColors = {
  [Category.Feature]: '#41A3FF',
  [Category.Changed]: '#ECD200',
  [Category.Deprecated]: '#FF5454',
  [Category.Fixed]: '#05D7B1',
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

const statusColors = {
  [Status.NotStarted]: '#f44336',
  [Status.InProgress]: '#BBFFF3',
  [Status.Completed]: '#C7E3FE',
}

const statusTextColors = {
  [Status.NotStarted]: '#41A3FF',
  [Status.InProgress]: '#05D7B1',
  [Status.Completed]: '#41A3FF',
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
                <Typography variant="subtitle2" sx={{marginBottom: 1}}><strong>{row.releaseTitle}</strong></Typography>
                {row.changeItems.map((item, index) => (
                  <Box key={index} sx={{marginBottom: 1}}>
                    <Box sx={{ borderRadius: 1, paddingTop: 0.1, paddingBottom: 0.1, paddingLeft: 1, paddingRight: 1, background: categoryColors[item.category], display: 'inline-block', marginRight: 1 }}>
                      <Typography variant="caption" component="span" sx={{color: categoryTextColors[item.category]}}>
                        <b>{Category[item.category]}</b>
                      </Typography>
                    </Box>
                    {item.releaseContent}
                  </Box>
                ))}
              </TableCell>
              <TableCell align='left'>
                <Box sx={{ borderRadius: 1, paddingTop: 0.1, paddingBottom: 0.1, paddingLeft: 1, paddingRight: 1, background: statusColors[row.status], display: 'inline-block' }}>
                  <Typography variant="caption" component="span" sx={{color: statusTextColors[row.status]}}>
                    <b>{row.status}</b>
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align='left'>{row.creationDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProjectTable
