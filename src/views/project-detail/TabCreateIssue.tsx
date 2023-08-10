import React, { useState } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Button, { ButtonProps } from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import ArrowLeft from 'mdi-material-ui/ArrowLeft'
import TextField from '@mui/material/TextField';

// ** Custom Components Imports
import CreateIssueCard from './CreateIssueCard';
import StatusTag, { Status } from "./StatusTag"

// ** Recoil Imports
import { useRecoilState } from 'recoil';
import { activeView } from 'src/recoil/issue/atom';

const CardWrapper = styled(Box)<BoxProps>({
    width: '33%',
    height: 500
})

const ButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
    margin: theme.spacing(2.5),
    width: 80,
}))

interface onIssueCreateProps {
    onIssueCreate: any
}
const TabCreateIssue = ({ onIssueCreate }: onIssueCreateProps) => {

    const [activeTab, setActiveTab] = useRecoilState(activeView);
    const [issueTitle, setIssueTitle] = useState('');

    const handleCreateIssue = () => {
        onIssueCreate(issueTitle);
        setActiveTab('issue');
    };

    return (
        <Grid container justifyContent="flex-start" alignItems="center" >
            <Grid item xs={12} >
                <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                    <IconButton sx={{ ml: 8, mt: 5 }} style={{ borderRadius: 10, padding: 8, alignSelf: "self-start" }}>
                        <ArrowLeft />
                    </IconButton>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 5 }}>
                        <TextField
                            sx={{ backgroundColor: 'white', ml: 8 }}
                            id="issue_title"
                            label="이슈 제목"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                inputProps: { 'aria-label': '이슈 제목 입력창' }
                            }}
                            value={issueTitle}
                            onChange={(e) => setIssueTitle(e.target.value)}
                        />
                        <Box sx={{ display: 'flex' }}>
                            <ButtonStyled variant='contained' sx={{ fontSize: '0.8rem' }}
                                onClick={handleCreateIssue}>
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
                    <Box sx={{ ml: 10, mt: 4, gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Avatar src='/images/avatars/8.png' alt='Alice Cobb' />
                        <IconButton style={{ borderRadius: 10, padding: 8 }}>
                            <StatusTag status={Status.InProgress} />
                        </IconButton>
                    </Box>
                    <CardContent sx={{ display: 'flex', justifyContent: 'center', gap: '0rem', alignItems: 'stretch' }}>
                        <CardWrapper sx={{ width: '100%' }}>
                            <CreateIssueCard />
                        </CardWrapper>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default TabCreateIssue
