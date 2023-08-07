// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import IssueTag from './IssueTag';

// ** Custom Components Imports
import CategoryTag, { Category } from 'src/views/project-detail/CategoryTag'

const createReleaseNoteData = (releaseNoteId: number, version: string, releaseTitle: string, changeItems: ReleaseContent[], creatorId: string, creationDate: string) => {
    return { releaseNoteId, version, releaseTitle, changeItems, creatorId, creationDate }
}


interface ReleaseContent {
    category: Category,
    releaseContent: string
}

interface DataType {
    id: number;
    title: string;
}

const projectData: DataType = {
    id: 1,
    title: "할 일",
};

const CardWrapper = styled(Box)<BoxProps>({
    width: '33%',
    height: 500
})



const rows = [
    createReleaseNoteData(4, 'v 1.2.1', 'BB 기능 추가 및 변경', [{ category: Category.Feature, releaseContent: 'bb 기능 - 기능 설명' }, { category: Category.Changed, releaseContent: '타입 변경' }], '유소연', '2023.06.30'),
    createReleaseNoteData(3, 'v 1.1.2', 'OO 서비스 중단', [{ category: Category.Deprecated, releaseContent: '~API 중단' }], '이소현', '2023.06.29'),
    createReleaseNoteData(2, 'v 1.1.1', 'AA 기능 수정 및 버그 해결', [{ category: Category.Fixed, releaseContent: '~ 연동 안되는 버그 수정' }, { category: Category.Changed, releaseContent: '~ 성능 개선' }], '이서빈', '2023.06.26'),
    createReleaseNoteData(1, 'v 1.0.0', '문서 최초 생성', [{ category: Category.Feature, releaseContent: '신규 기능 추가 / AA 기능 제공' }], '장예경', '2023.06.20')
]


const TabIssue = () => {

    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12}>
                <Card sx={{ display: 'flex', flexDirection: 'column', overflow: 'auto', }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', gap: '0rem', alignItems: 'stretch' }}>
                        <CardWrapper>
                            <IssueTag />
                        </CardWrapper>
                        <CardWrapper>
                            <IssueTag />
                        </CardWrapper>
                        <CardWrapper>
                            <IssueTag />
                        </CardWrapper>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default TabIssue
