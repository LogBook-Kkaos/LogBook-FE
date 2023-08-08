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
import ArrowLeft from 'mdi-material-ui/ArrowLeft'
import IconButton from '@mui/material/IconButton'
import CreateIssueTag from './CreateIssueTag';
import Button, { ButtonProps } from '@mui/material/Button'
import StatusTag, { Status } from "./StatusTag"
import Avatar from '@mui/material/Avatar'

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

const ButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
    margin: theme.spacing(2.5),
    width: 80,
}))

const rows = [
    createReleaseNoteData(4, 'v 1.2.1', 'BB 기능 추가 및 변경', [{ category: Category.Feature, releaseContent: 'bb 기능 - 기능 설명' }, { category: Category.Changed, releaseContent: '타입 변경' }], '유소연', '2023.06.30'),
    createReleaseNoteData(3, 'v 1.1.2', 'OO 서비스 중단', [{ category: Category.Deprecated, releaseContent: '~API 중단' }], '이소현', '2023.06.29'),
    createReleaseNoteData(2, 'v 1.1.1', 'AA 기능 수정 및 버그 해결', [{ category: Category.Fixed, releaseContent: '~ 연동 안되는 버그 수정' }, { category: Category.Changed, releaseContent: '~ 성능 개선' }], '이서빈', '2023.06.26'),
    createReleaseNoteData(1, 'v 1.0.0', '문서 최초 생성', [{ category: Category.Feature, releaseContent: '신규 기능 추가 / AA 기능 제공' }], '장예경', '2023.06.20')
]


const TabCreateIssue = () => {

    return (
        <Grid container justifyContent="flex-start" alignItems="center" >
            <Grid item xs={12} >
                <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                    <IconButton sx={{ ml: 8, mt: 5 }} style={{ borderRadius: 10, padding: 8, alignSelf: "self-start" }}>
                        <ArrowLeft />
                    </IconButton>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 5 }}>
                        <CardHeader
                            title='신규 기능 A'
                            sx={{ ml: 5, pt: 2.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
                            titleTypographyProps={{
                                variant: 'h6',
                                sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
                            }}
                        />
                        <Box sx={{ display: 'flex', }}>
                            <ButtonStyled variant='contained' sx={{ fontSize: '0.8rem' }}>
                                저장
                                <input
                                    hidden
                                    type='file'
                                    accept='image/png, image/jpeg'
                                    id='account-settings-upload-image'
                                />
                            </ButtonStyled>
                            <ButtonStyled variant='contained' sx={{ fontSize: '0.8rem', mr: 8 }}>
                                삭제
                                <input
                                    hidden
                                    type='file'
                                    accept='image/png, image/jpeg'
                                    id='account-settings-upload-image'
                                />
                            </ButtonStyled>
                        </Box>
                    </Box>
                    <Box sx={{ ml: 10, gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Avatar src='/images/avatars/8.png' alt='Alice Cobb' />
                        <IconButton style={{ borderRadius: 10, padding: 8 }}>
                            <StatusTag status={Status.InProgress} />
                        </IconButton>
                    </Box>
                    <CardContent sx={{ display: 'flex', justifyContent: 'center', gap: '0rem', alignItems: 'stretch' }}>
                        <CardWrapper sx={{ width: '100%' }}>
                            <CreateIssueTag />
                        </CardWrapper>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default TabCreateIssue
