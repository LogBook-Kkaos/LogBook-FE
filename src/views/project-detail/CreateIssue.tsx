import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useForm, Controller, FieldValues } from 'react-hook-form';

// ** Next Imports
import { useRouter } from 'next/router'

// ** HTTP Client Imports
import axios from 'axios';

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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { ThemeProvider, createMuiTheme } from '@mui/material/styles';

// ** Custom Components Imports
import StatusTag, { Status } from "./StatusTag"

// ** Recoil Imports
import { useRecoilState } from 'recoil';
import { activeView } from 'src/recoil/issue/atom';
import { Typography } from '@mui/material';


const CardWrapper = styled(Box)<BoxProps>({
    width: '33%',
    height: 500
})

const ButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
    margin: theme.spacing(2.5),
    width: 80,
}))

interface GetMemberIdParams {
    projectId: string;
    email: string;
}

const TabCreateIssue = () => {

    const router = useRouter();

    const { control, register, handleSubmit, formState: { errors }, reset } = useForm();

    const projectId = router.query.projectId;

    const [activeTab, setActiveTab] = useRecoilState(activeView);
    const [assignee, setAssignee] = useState<string | null>(null);
    const [assigneeEmail, setAssigneeEmail] = useState<string | null>(null);
    const [assigneeOptions, setAssigneeOptions] = useState([
        { value: null, label: "담당자 없음", email: null },
    ]);
    const [status, setStatus] = useState<Status>(Status.InProgress);
    const [assigneeAnchorEl, setAssigneeAnchorEl] = useState<null | HTMLElement>(null);
    const [statusAnchorEl, setStatusAnchorEl] = useState<null | HTMLElement>(null);
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);

    const statusOptions = [
        { value: Status.InProgress, label: Status.InProgress },
        { value: Status.NotStarted, label: Status.NotStarted },
        { value: Status.Completed, label: Status.Completed },
    ];

    const handleStatusChange = (selectedOption: any) => {
        setStatus(selectedOption.value);
        console.log(selectedOption.value);
    };

    const handleTabChange = (newTab: string) => {
        setActiveTab(newTab);
    };

    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAssigneeAnchorEl(event.currentTarget);
    };

    const handleAssigneeMenuClose = () => {
        setAssigneeAnchorEl(null);
    };

    const handleStatusTagClick = (event: React.MouseEvent<HTMLElement>) => {
        setStatusAnchorEl(event.currentTarget);
    };

    const handleStatusMenuClose = () => {
        setStatusAnchorEl(null);
    };


    const handleAssigneeChange = (selectedAssignee: string | null, selectedEmail: string | null) => {
        setAssignee(selectedAssignee);
        setAssigneeEmail(selectedEmail);
        console.log(selectedEmail);
    };

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
    };


    const fetchProjectMembers = useCallback(async () => {
        try {
            const response = await axios.get(`/api/projects/${projectId}/members`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                },
            });

            const memberList = response.data.result.map((member: any) => ({
                value: member.userName,
                label: `${member.userName} (${member.email})`,
                email: member.email,
            }));


            setAssigneeOptions([{ value: null, label: "담당자 없음", email: null }]);
            setAssigneeOptions((prev) => [...prev, ...memberList]);
        } catch (error) {
            console.log("Error fetching project members: ", error);
        }
    }, [projectId]);


    async function getMemberId(params: GetMemberIdParams): Promise<string> {
        const { projectId, email } = params;
        const response = await axios
            .get(`/api/projects/${projectId}/members/info`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
                },
                params: {
                    email: email
                }
            }
            );
        const { result: memberId } = response.data;

        return memberId;


    }


    const onSubmit = async (data: FieldValues) => {

        const assigneeId = await getMemberId({ projectId: projectId as string, email: assigneeEmail as string });

        const issueData = {
            issueTitle: data.issueTitle,
            issueDescription: data.issueDescription,
            assignee: {
                assigneeId: assigneeId,
                userName: assignee,
            },
            status: status,
            startDate: startDate,
            endDate: endDate,
        }



        console.log(issueData);

        try {
            const response = await axios.post(`/api/projects/${projectId}/issues`, issueData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                },
            });

            console.log(response);

            reset();

            setActiveTab('issue');
        } catch (error) {
            console.log("Error creating issue: ", error);
        }
    }

    useEffect(() => {
        fetchProjectMembers();
    }, [fetchProjectMembers]);

    return (
        <Grid container justifyContent="flex-start" alignItems="center" >
            <Grid item xs={12} >
                <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                        <IconButton sx={{ ml: 8, mt: 5 }} style={{ borderRadius: 10, padding: 8, alignSelf: "self-start" }}
                            onClick={() => handleTabChange('issue')}>
                            <ArrowLeft />
                        </IconButton>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 5 }}>
                            <TextField
                                sx={{ backgroundColor: 'white', ml: 8 }}
                                {...register('issueTitle', { required: '이슈를 입력해주세요.' })}
                                id="issue_title"
                                label="이슈 제목"
                                variant="outlined"
                                fullWidth

                                error={!!errors.issueTitle}
                                helperText={errors.issueTitle ? errors.issueTitle.message : ""}
                                InputProps={{
                                    inputProps: { 'aria-label': '이슈 제목 입력창' }
                                }}
                            />
                            <Box sx={{ display: 'flex' }}>
                                <ButtonStyled type="submit" variant='contained' sx={{ fontSize: '0.8rem' }}>
                                    저장
                                </ButtonStyled>
                                <ButtonStyled variant='contained' sx={{ fontSize: '0.8rem', mr: 8 }}>
                                    삭제
                                </ButtonStyled>
                            </Box>
                        </Box>
                        <Box sx={{ ml: 10, mt: 4, gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <IconButton style={{ borderRadius: 10, padding: 8 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Avatar
                                        src="/images/avatars/8.png"
                                        alt={assignee || "없음"}
                                        onClick={handleAvatarClick}
                                        sx={{ cursor: "pointer" }}
                                    />
                                    <Typography sx={{ mt: 1, fontSize: '12px', color: 'gray' }}>{assignee || "담당자 없음"}</Typography>
                                </Box>
                            </IconButton>

                            <Menu
                                anchorEl={assigneeAnchorEl}
                                open={Boolean(assigneeAnchorEl)}
                                onClose={handleAssigneeMenuClose}
                            >
                                {assigneeOptions.map((option) => (
                                    <MenuItem
                                        key={`${option.value}-${option.email}`}
                                        onClick={() => {
                                            handleAssigneeChange(option.value, option.email);
                                            handleAssigneeMenuClose();
                                        }}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Menu>
                            <IconButton onClick={handleStatusTagClick} style={{ borderRadius: 10, padding: 8 }}>
                                <StatusTag status={status} />
                            </IconButton>
                            <Menu
                                anchorEl={statusAnchorEl}
                                open={Boolean(statusAnchorEl)}
                                onClose={handleStatusMenuClose}
                            >
                                {statusOptions.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        onClick={() => {
                                            handleStatusChange(option);
                                            handleStatusMenuClose();
                                        }}
                                    >
                                        <StatusTag status={option.label} />
                                    </MenuItem>
                                ))}
                            </Menu>
                            <ThemeProvider
                                theme={createMuiTheme({
                                    palette: {
                                        primary: {
                                            main: '#1976d2',
                                        },
                                    },
                                })}

                            >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="시작 날짜"
                                        value={startDate}
                                        inputFormat='yyyy-MM-dd'
                                        mask='____-__-__'
                                        onChange={handleStartDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <DatePicker
                                        label="종료 날짜"
                                        value={endDate}
                                        inputFormat='yyyy-MM-dd'
                                        mask='____-__-__'
                                        onChange={handleEndDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </ThemeProvider>

                        </Box>

                        <CardContent sx={{ display: 'flex', justifyContent: 'center', gap: '0rem', alignItems: 'stretch' }}>
                            <CardWrapper sx={{ width: '100%' }}>
                                <Card sx={{ p: 1, m: 2, backgroundColor: "#e0f2ff" }}>
                                    <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'left', p: '1.25rem' }}>
                                        <TextField
                                            sx={{ backgroundColor: 'white' }}
                                            {...register('issueDescription')}
                                            id="issue_content"
                                            label="이슈 내용 설명"
                                            multiline
                                            rows={8}
                                            variant="outlined"
                                            fullWidth
                                            InputProps={{
                                                inputProps: { 'aria-label': '이슈 내용 입력창' }
                                            }}
                                        />
                                    </Box>
                                </Card>
                            </CardWrapper>
                        </CardContent>
                    </Card>
                </form>
            </Grid>
        </Grid>
    )
}

export default TabCreateIssue
