import React, { useState, useEffect, useCallback } from 'react';

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
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import PlusThick from 'mdi-material-ui/PlusThick'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'

// ** Custom Components Imports
import StatusTag, { Status } from 'src/views/project-detail/StatusTag'

// ** Recoil Imports
import { useRecoilState } from 'recoil'
import { activeView } from 'src/recoil/issue/atom'

interface GetMemberIdParams {
  projectId: string
  email: string
}

interface IssueInfo {
  issueId: string
  issueTitle: string
  assigneeName?: string | null
  assigneeEmail?: string | null
  status: Status
}

interface CardIssueProps {
  cardTitle: string
}

const CardIssue = ({ cardTitle }: CardIssueProps) => {
  const [activeTab, setActiveTab] = useRecoilState(activeView);

  const router = useRouter()
  const projectId = router.query.projectId

  const [issues, setIssues] = useState<IssueInfo[]>([])
  const [assignee, setAssignee] = useState<string | null>(null)
  const [assigneeEmail, setAssigneeEmail] = useState<string | null>(null)
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

  const handleTabChange = (newTab: string, issueId?: string) => {
    if (newTab === 'issueDetail' && issueId) {
      sessionStorage.setItem('issueId', issueId);
      setActiveTab(newTab);
    } else {
      setActiveTab(newTab);
    }
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>, issueId: string) => {
    event.stopPropagation();
    setAssigneeAnchorEls({ ...assigneeAnchorEls, [issueId]: event.currentTarget });
  };

  const handleAssigneeMenuClose = (
    event: React.MouseEvent<HTMLElement> | {},
    issueId: string
  ) => {
    event instanceof MouseEvent && event.stopPropagation();
    setAssigneeAnchorEls({ ...assigneeAnchorEls, [issueId]: null });
  };
  const handleStatusTagClick = (event: React.MouseEvent<HTMLElement>, issueId: string) => {
    event.stopPropagation();
    setStatusAnchorEls({ ...statusAnchorEls, [issueId]: event.currentTarget });
  };

  const handleStatusMenuClose = (
    event: React.MouseEvent<HTMLElement> | {},
    issueId: string
  ) => {
    event instanceof MouseEvent && event.stopPropagation();
    setAssigneeAnchorEls({ ...statusAnchorEls, [issueId]: null });
  };

  const fetchAllIssues = async () => {
    const params = { status: cardTitle };
    const IssueResponse = await axios.get(`/api/projects/${projectId}/issues/filter`, {
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}` },
      params: params
    });

    const formattedIssues = IssueResponse.data.result.map((issue: any) => ({
      issueId: issue.issueId,
      issueTitle: issue.issueTitle,
      assigneeName: issue.assignee?.userName,
      assigneeEmail: issue.assignee?.email,
      status: issue.status
    }));

    setIssues(formattedIssues);
  };

  useEffect(() => {
    fetchAllIssues();
  }, [projectId, cardTitle]);

  const handleAssigneeChange = async (selectedAssignee: string | null, selectedEmail: string | null, issueId: string) => {
    setAssignee(selectedAssignee);
    setAssigneeEmail(selectedEmail);
    if (issueId && selectedEmail) {
      const assigneeId = getMemberId({ projectId: projectId as string, email: selectedEmail });
      await updateIssueAssignee(issueId, await assigneeId);
      fetchAllIssues();
    };
  }

  const handleStatusChange = async (selectedOption: any, issueId: string) => {
    setStatus(selectedOption.value);
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


  return (
  <>
    <Card sx={{ p: 3, m: 2, backgroundColor: "#e0f2ff" }}>
      <CardHeader
        title={cardTitle}
        sx={{ pt: 2.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
        titleTypographyProps={{
          variant: 'h6',
          sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
        }}
      />
      {issues.map((item: IssueInfo, index: number) => {
        return (
          <Card key={item.issueId}
            sx={{
              position: 'relative',
              mb: 2,
              transition: '0.3s',
              boxShadow: 1,
              '&:hover': {
                boxShadow: 4,
                transform: 'scale(1.02)',
              },
            }}>
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
              >
                <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}
                  onClick={() => handleTabChange('issueDetail', item.issueId)}
                >
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
                  onClose={(event) => handleStatusMenuClose(event, item.issueId)}
                >
                  {statusOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      onClick={(event) => {
                        handleStatusChange(option, item.issueId);
                        handleStatusMenuClose(event, item.issueId);
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
                  onClose={(event) => handleAssigneeMenuClose(event, item.issueId)}
                >
                  {assigneeOptions.map((option) => (
                    <MenuItem
                      key={`${option.value}-${option.email}`}
                      onClick={(event) => {
                        handleAssigneeChange(option.value, option.email, item.issueId);
                        handleAssigneeMenuClose(event, item.issueId);
                      }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Menu>

              </Box>
            </CardContent>
          </Card>
        )
      })}
      <Box sx={{ display: 'flex', flexDirection: 'row' }}
        onClick={() => handleTabChange('createIssue')} width='100%'>
        <IconButton style={{ borderRadius: 10, width: '100%', justifyContent: 'left' }} >
          <PlusThick />
          <Typography sx={{ ml: 3 }}>이슈 추가</Typography>
        </IconButton>
      </Box>
    </Card>

  </>
  )
}

export default CardIssue
