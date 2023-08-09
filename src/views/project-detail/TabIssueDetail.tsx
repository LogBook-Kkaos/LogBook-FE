// ** MUI Imports
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Button, { ButtonProps } from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box, { BoxProps } from '@mui/material/Box';
import ArrowLeft from 'mdi-material-ui/ArrowLeft';
import { styled } from '@mui/material/styles';

// ** Custom Components Imports
import CategoryTag, { Category } from 'src/views/project-detail/CategoryTag'
import SubIssueTag from './SubIssueTag';

import { useRecoilState } from 'recoil';
import { activeView } from '../../recoil/issue/atom';

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

const TabIssueDetail = () => {

    const [activeTab, setActiveTab] = useRecoilState(activeView);

    const handleIssueClick = () => {
        setActiveTab('issue');
    };

    const handleIssueCardClick = () => {
        setActiveTab('issueDetail');
    };

    const handleAddIssueClick = () => {
        setActiveTab('createIssue');
    };

    return (
        <Grid container justifyContent="flex-start" alignItems="center" >
            <Grid item xs={12} >
                <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                    <IconButton sx={{ ml: 8, mt: 5 }} style={{ borderRadius: 10, padding: 8, alignSelf: "self-start" }}
                        onClick={handleIssueClick}>
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
                    <CardHeader
                        title='하위 이슈'
                        sx={{ ml: 5, pt: 1, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
                        titleTypographyProps={{
                            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
                        }}
                    />
                    <CardContent sx={{ display: 'flex', justifyContent: 'center', gap: '0rem', alignItems: 'stretch' }}>
                        <CardWrapper sx={{ width: '100%' }}>
                            <SubIssueTag />
                        </CardWrapper>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default TabIssueDetail
