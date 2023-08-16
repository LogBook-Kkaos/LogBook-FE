import React, { useState } from 'react';
import { useForm, Controller, FieldValues } from 'react-hook-form';

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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

// ** Custom Components Imports
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

interface Issue {
    issueTitle: string,
    issueDescription: string,
    assignee: string,
    status: Status,
}

const TabCreateIssue = ({ onIssueCreate }: onIssueCreateProps) => {

    const { control, register, handleSubmit, formState: { errors }, reset } = useForm();

    const [activeTab, setActiveTab] = useRecoilState(activeView);
    const [selectVisible, setSelectVisible] = useState<boolean>(false);
    const [assignee, setAssignee] = useState<string>('');
    const [status, setStatus] = useState<Status>(Status.InProgress);

    const options = [
        { value: '이서빈', label: '이서빈' },
        { value: '이소현', label: '이소현' },
        { value: '윤주은', label: '윤주은' },
        { value: '장예경', label: '장예경' },
    ];

    const statusOptions = [
        { value: Status.InProgress, label: "진행 중" },
        { value: Status.NotStarted, label: "아직 시작되지 않음" },
        { value: Status.Completed, label: "완료됨" },
    ];

    const handleStatusChange = (selectedOption: any) => {
        setStatus(selectedOption.value);
    };


    const handleCreateIssue = () => {
        setActiveTab('issue');
    };

    const handleTabChange = (newTab: string) => {
        setActiveTab(newTab);
    };

    const handleAvatarClick = () => {
        setSelectVisible(true);
    };

    const handleSelectChange = (selectedOption: any) => {
        setAssignee(selectedOption.value);
        console.log(selectedOption.value)
    };

    const onSubmit = (data: FieldValues) => {
        console.log({
            issueTitle: data.issueTitle,
            issueDescription: data.issueDescription,
            assignee: assignee,
            status: status,
        })
        setActiveTab('issue');
    }

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
                                {...register('issueTitle', { required: true })}
                                id="issue_title"
                                label="이슈 제목"
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    inputProps: { 'aria-label': '이슈 제목 입력창' }
                                }}
                            />
                            {errors.issueTitle && <span>이슈 제목을 입력해주세요</span>}
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
                            <Avatar src='/images/avatars/8.png' alt={assignee || '없음'}
                                onClick={handleAvatarClick} />
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: "150px",
                                    mt: 1,
                                    py: 1,
                                    zIndex: 5000
                                }}
                            >
                                <FormControl sx={{ minWidth: 120, mt: 1 }}>
                                    <InputLabel id="assignee-select-label">담당자</InputLabel>
                                    <Select
                                        labelId="assignee-select-label"
                                        open={selectVisible}
                                        onClose={() => setSelectVisible(false)}
                                        onOpen={() => setSelectVisible(true)}
                                        value={assignee}
                                        onChange={(event: SelectChangeEvent) => handleSelectChange(event.target.value as string)}
                                    >
                                        {options.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>


                            </Box>
                            <FormControl sx={{ minWidth: 120, mt: 2 }}>
                                <InputLabel id="status-select-label">이슈 상태</InputLabel>
                                <Select
                                    labelId="status-select-label"
                                    value={status}
                                    onChange={(event: SelectChangeEvent) => handleStatusChange(event.target.value as Status)}
                                >
                                    {statusOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Box sx={{ mt: 2 }}>
                                <StatusTag status={status} />
                            </Box>
                        </Box>

                        <CardContent sx={{ display: 'flex', justifyContent: 'center', gap: '0rem', alignItems: 'stretch' }}>
                            <CardWrapper sx={{ width: '100%' }}>
                                <Card sx={{ p: 1, m: 2, backgroundColor: "#e0f2ff" }}>
                                    <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'left', p: '1.25rem' }}>
                                        <TextField
                                            sx={{ backgroundColor: 'white' }}
                                            {...register('issueDescription', { required: true })}
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
