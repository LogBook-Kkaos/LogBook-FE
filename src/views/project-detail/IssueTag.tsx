import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';

// ** Next Imports
import { useRouter } from 'next/router';

// ** HTTP Client Imports
import axios from 'axios';

// ** MUI Imports
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Cog from 'mdi-material-ui/CogOutline'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import PlusThick from 'mdi-material-ui/PlusThick'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

// ** Custom Components Imports
import StatusTag, { Status } from 'src/views/project-detail/StatusTag';

// ** Recoil Imports
import { useRecoilState } from 'recoil';
import { activeView } from 'src/recoil/issue/atom';

interface GetMemberIdParams {
  projectId: string;
  email: string;
}

interface IssueDataType {
  issueId: string,
  issueTitle: string,
  assigneeName: string | null,
  assigneeEmail: string | null
  status: Status;
}

interface IssueTagProps {
  onIssueCreate: any,
  issueData: any
}

const IssueTag = ({ onIssueCreate, issueData }: IssueTagProps) => {
  const [activeTab, setActiveTab] = useRecoilState(activeView);
  const [selectedValue, setSelectedValue] = useState<string>('');

  const router = useRouter();
  const projectId = router.query.projectId;

  const [issues, setIssues] = useState<any[]>([]);

  const [assignee, setAssignee] = useState<string | null>(null);
  const [assigneeEmail, setAssigneeEmail] = useState<string | null>(null);
  const [assigneeOptions, setAssigneeOptions] = useState([
    { value: null, label: "담당자 없음", email: null },
  ]);
  const [status, setStatus] = useState<Status>(Status.InProgress);
  const [assigneeAnchorEls, setAssigneeAnchorEls] = useState<{ [issueId: string]: HTMLElement | null }>({});
  const [statusAnchorEls, setStatusAnchorEls] = useState<{ [issueId: string]: HTMLElement | null }>({});


  const statusOptions = [
    { value: Status.InProgress, label: Status.InProgress },
    { value: Status.NotStarted, label: Status.NotStarted },
    { value: Status.Completed, label: Status.Completed },
  ];

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>, issueId: string) => {
    setAssigneeAnchorEls({ ...assigneeAnchorEls, [issueId]: event.currentTarget });
  };

  const handleAssigneeMenuClose = (issueId: string) => {
    setAssigneeAnchorEls({ ...assigneeAnchorEls, [issueId]: null });
  };

  const handleStatusTagClick = (event: React.MouseEvent<HTMLElement>, issueId: string) => {
    setStatusAnchorEls({ ...statusAnchorEls, [issueId]: event.currentTarget });
  };

  const handleStatusMenuClose = (issueId: string) => {
    setStatusAnchorEls({ ...statusAnchorEls, [issueId]: null });
  };



  const handleAssigneeChange = async (selectedAssignee: string | null, selectedEmail: string | null, issueId: string) => {
    setAssignee(selectedAssignee);
    setAssigneeEmail(selectedEmail);
    console.log(issueId);
    if (issueId && selectedEmail) {
      const assigneeId = getMemberId({ projectId: projectId as string, email: selectedEmail });
      await updateIssueAssignee(issueId, await assigneeId);
      fetchAllIssues();
    };
  }


  const handleStatusChange = async (selectedOption: any, issueId: string) => {
    setStatus(selectedOption.value);
    console.log(selectedOption.value);
    if (issueId) {
      await updateIssueStatus(issueId, selectedOption.value);
      fetchAllIssues();
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

  const fetchAllIssues = async () => {
    const response = await axios.get(`/api/projects/${projectId}/issues`,
      {
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}` }
      }
    );

    const formattedIssues = response.data.result.map((issue: any) => ({
      issueId: issue.issueId,
      issueTitle: issue.issueTitle,
      assigneeName: issue.assignee?.userName,
      assigneeEmail: issue.assignee?.email,
      status: issue.status
    }));
    setIssues(formattedIssues);
    console.log(response.data.result);
  };

  useEffect(() => {
    fetchAllIssues();
  }, []);

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


  return (<>
    <Card sx={{ p: 3, m: 2, backgroundColor: "#e0f2ff" }}>
      <CardHeader
        title='할 일'
        sx={{ pt: 2.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
        titleTypographyProps={{
          variant: 'h6',
          sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
        }}
      />
      {issues.map((item: IssueDataType, index: number) => {
        return (
          <Card key={index}
            sx={{ position: 'relative', mb: 2 }}>
            <CardContent>
              <Box
                sx={{
                  mt: 2,
                  mb: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
                onClick={() => handleTabChange('issueDetail')}
              >
                <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography >{item.issueTitle}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={(e) => handleStatusTagClick(e, item.issueId)} style={{ borderRadius: 10, padding: 8 }}>
                  <StatusTag status={item.status} />
                </IconButton>
                <Menu
                  anchorEl={statusAnchorEls[item.issueId]}
                  open={Boolean(statusAnchorEls[item.issueId])}
                  onClose={() => handleStatusMenuClose(item.issueId)}
                >
                  {statusOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      onClick={() => {
                        handleStatusChange(option, item.issueId);
                        handleStatusMenuClose(item.issueId);
                      }}
                    >
                      <StatusTag status={option.label} />
                    </MenuItem>
                  ))}
                </Menu>
                <IconButton onClick={(e) => handleAvatarClick(e, item.issueId)} style={{ borderRadius: 10, padding: 8 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    onClick={(e) => handleAvatarClick(e, item.issueId)}>
                    <Avatar
                      src="/images/avatars/8.png"
                      alt={item.assigneeName || "없음"}
                      sx={{ cursor: "pointer" }}
                    />
                    <Typography sx={{ mt: 1, fontSize: '12px', color: 'gray' }}>{item.assigneeName || "담당자 없음"}</Typography>
                  </Box>
                </IconButton>
                <Menu
                  anchorEl={assigneeAnchorEls[item.issueId]}
                  open={Boolean(assigneeAnchorEls[item.issueId])}
                  onClose={() => handleAssigneeMenuClose(item.issueId)}
                >
                  {assigneeOptions.map((option) => (
                    <MenuItem
                      key={`${option.value}-${option.email}`}
                      onClick={() => {
                        handleAssigneeChange(option.value, option.email, item.issueId);
                        handleAssigneeMenuClose(item.issueId);
                      }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Menu>

              </Box>
            </CardContent>
          </Card>)
      })}
      <Box sx={{ display: 'flex', flexDirection: 'row' }}
        onClick={() => handleTabChange('createIssue')}>
        <IconButton style={{ borderRadius: 10 }}>
          <PlusThick />
        </IconButton>
        <Box sx={{ paddingTop: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography >이슈 추가</Typography>
        </Box>
      </Box>
    </Card>

  </>
  )
}

export default IssueTag
