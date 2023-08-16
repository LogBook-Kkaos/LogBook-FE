// ** React Imports
import React, { useEffect, useState, useCallback } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** HTTP Imports
import axios from 'axios'

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
import { Typography } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Menu } from '@mui/material';
import { Avatar } from '@mui/material';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';


// ** Custom Components Imports
import SubIssueCard from './SubIssueCard';
import StatusTag, { Status } from './StatusTag';

import { useRecoilState } from 'recoil';
import { activeView } from 'src/recoil/issue/atom';

interface GetMemberIdParams {
    projectId: string;
    email: string;
}

interface TabIssueDetailProps {
    issueId: string,
}

const CardWrapper = styled(Box)<BoxProps>({
    width: '33%',
    height: 500
})

const ButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
    margin: theme.spacing(2.5),
    width: 80,
}))

const TabIssueDetail: React.FC<TabIssueDetailProps> = ({ issueId }) => {

    const [activeTab, setActiveTab] = useRecoilState(activeView);

    const handleTabChange = (newTab: string) => {
        setActiveTab(newTab);
    };

const statusStringToType = (statusString: string): Status => {
    switch (statusString) {
      case "할일":
        return Status.NotStarted;
      case "진행중":
        return Status.InProgress;
      case "완료":
        return Status.Completed;
      default:
        return Status.NotStarted;
    }
  };
  
  

    const router = useRouter();
    const projectId = router.query.projectId;


    const [assignee, setAssignee] = useState<string | null>(null);
    const [assigneeEmail, setAssigneeEmail] = useState<string | null>(null);
    const [assigneeOptions, setAssigneeOptions] = useState([
        { value: null, label: "담당자 없음", email: null },
    ]);
    const [status, setStatus] = useState<Status>(Status.InProgress);
    const [assigneeAnchorEl, setAssigneeAnchorEl] = useState<null | HTMLElement>(null);
    const [statusAnchorEl, setStatusAnchorEl] = useState<null | HTMLElement>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);


    const statusOptions = [
        { value: Status.InProgress, label: Status.InProgress },
        { value: Status.NotStarted, label: Status.NotStarted },
        { value: Status.Completed, label: Status.Completed },
    ];

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

    const handleAssigneeChange = async (selectedAssignee: string | null, selectedEmail: string | null, issueId: string) => {
        setAssignee(selectedAssignee);
        setAssigneeEmail(selectedEmail);
        if (issueId && selectedEmail) {
            const assigneeId = getMemberId({ projectId: projectId as string, email: selectedEmail });
            await updateIssueAssignee(issueId, await assigneeId);
            fetchIssueById(projectId as string, issueId).then((data) => {
                setIssueDetail(data);
            }
            );
        };
    }

    const handleStatusChange = async (selectedOption: any, issueId: string) => {
        setStatus(selectedOption.value);
        if (issueId) {
            await updateIssueStatus(issueId, selectedOption.value);
            fetchIssueById(projectId as string, issueId).then((data) => {
                setIssueDetail(data);
            }
            );
        }
    };

    const handleStartDateChange = async (date: Date | null) => {
        setStartDate(date);
        if (issueId) {
            await updateIssueStartDate(issueId, date);
            fetchIssueById(projectId as string, issueId).then((data) => {
                setIssueDetail(data);
            }
            );
        }
    };

    const handleEndDateChange = async (date: Date | null) => {
        setEndDate(date);
        if (issueId) {
            await updateIssueEndDate(issueId, date);
            fetchIssueById(projectId as string, issueId).then((data) => {
                setIssueDetail(data);
            }
            );
        }
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


    useEffect(() => {
        fetchProjectMembers();
    }, [fetchProjectMembers]);

    async function updateIssueAssignee(issueId: string, memberId: string) {

        console.log(`Updating assignee for issueId: ${issueId}, memberId: ${memberId}`);
        await axios.put(`/api/projects/${projectId}/issues/${issueId}/assignee`,
            {
                assigneeId: memberId
            },
            {
                headers: { 'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}` }
            }
        ).then((response) => {
            console.log(response.data.result);
        }).catch((error) => {
            console.log(error);
        });

    }

    async function updateIssueStatus(issueId: string, status: Status) {
        const response = await axios.put(`/api/projects/${projectId}/issues/${issueId}/status`,
            {
                status: status
            },
            {
                headers: { 'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}` }
            }
        ).then((response) => {
            console.log(response.data.result);
        }).catch((error) => {
            console.log(error);
        });
    }

    async function updateIssueStartDate(issueId: string, startDate: Date | null) {
        const response = await axios.put(`/api/projects/${projectId}/issues/${issueId}/startDate`,
            {
                startDate: startDate
            },
            {
                headers: { 'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}` }
            }
        ).then((response) => {
            console.log(response.data.result);
        }).catch((error) => {
            console.log(error);
        });
    }

    async function updateIssueEndDate(issueId: string, endDate: Date | null) {
        const response = await axios.put(`/api/projects/${projectId}/issues/${issueId}/endDate`,

            {
                endDate: endDate
            },
            {
                headers: { 'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}` }
            }
        ).then((response) => {
            console.log(response.data.result);
        }).catch((error) => {
            console.log(error);
        });
    }

    async function fetchIssueById(projectId: string, issueId: string) {
        console.log(projectId, issueId)
        const response = await axios.get(`/api/projects/${projectId}/issues/${issueId}`,
            {
                headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken') },
            });

        return response.data.result;
    }

    const [issueDetail, setIssueDetail] = useState<any>(null);

    useEffect(() => {
        const issueId = sessionStorage.getItem("issueId");
        fetchIssueById(projectId as string, issueId as string).then((data) => {
          setIssueDetail(data);
          if (data) {
            const currentStatus = statusStringToType(data.status);
            setIssueDetail((prev: any) => ({ ...prev, status: currentStatus }));
          }
        });
      }, [projectId, issueId]);


    return (
        <Grid container justifyContent="flex-start" alignItems="center" >
            <Grid item xs={12} >
                <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                    <IconButton sx={{ ml: 8, mt: 5 }} style={{ borderRadius: 10, padding: 8, alignSelf: "self-start" }}
                        onClick={() => handleTabChange('issue')}>
                        <ArrowLeft />
                    </IconButton>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 5 }}>
                        <CardHeader
                            title={issueDetail?.issueTitle}
                            sx={{ ml: 5, pt: 2.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
                            titleTypographyProps={{
                                variant: 'h4',
                                sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important', fontWeight: 'bold' }
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

                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography sx={{ ml: 5, pt: 2.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}>
                            {issueDetail?.issueDescription}
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'right' }}>
                        <IconButton onClick={handleStatusTagClick} style={{ borderRadius: 10, padding: 8 }}>
                            <StatusTag status={issueDetail?.status} />
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
                                        handleStatusChange(option, issueDetail.issueId);
                                        handleStatusMenuClose();
                                    }}
                                >
                                    <StatusTag status={option.label} />
                                </MenuItem>
                            ))}
                        </Menu>
                        <IconButton onClick={handleAvatarClick} style={{ borderRadius: 10, padding: 8 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                onClick={handleAvatarClick}>
                                <Avatar
                                    src="/images/avatars/8.png"
                                    alt={issueDetail?.assignee.userName || "없음"}
                                    sx={{ cursor: "pointer" }}
                                />
                                <Typography sx={{ mt: 1, fontSize: '12px', color: 'gray' }}>{issueDetail?.assignee.userName || "담당자 없음"}</Typography>
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
                                        handleAssigneeChange(option.value, option.email, issueDetail.issueId);
                                        handleAssigneeMenuClose();
                                    }}
                                >
                                    {option.label}
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
                                        value={issueDetail?.startDate}
                                        inputFormat='yyyy-MM-dd'
                                        mask='____-__-__'
                                        onChange={handleStartDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <DatePicker
                                        label="종료 날짜"
                                        value={issueDetail?.endDate}
                                        inputFormat='yyyy-MM-dd'
                                        mask='____-__-__'
                                        onChange={handleEndDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </ThemeProvider>


                    </Box>
                    </CardContent>

                    
                
                    <CardHeader
                        title='하위 이슈'
                        sx={{ ml: 5, pt: 1, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
                        titleTypographyProps={{
                            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
                        }}
                    />
                    <CardContent sx={{ display: 'flex', justifyContent: 'center', gap: '0rem', alignItems: 'stretch' }}>
                        <CardWrapper sx={{ width: '100%' }}>
                            <SubIssueCard />
                        </CardWrapper>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default TabIssueDetail
