import React, { useState, useEffect } from 'react'

import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import { DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material'
import TextField from '@mui/material/TextField'
import Autocomplete, { AutocompleteRenderOptionState, createFilterOptions } from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import Switch from '@mui/material/Switch'
import InputAdornment from '@mui/material/InputAdornment'
import Typography, { TypographyProps } from '@mui/material/Typography'

import Magnify from 'mdi-material-ui/Magnify'

// ** HTTP Client
import axios from 'axios'
import MemberRoleButton, { MemberRole } from '../add-project/MemberRoleButton'

// ** Recoil Imports
import { useRecoilValue } from 'recoil'
import { loginUserState } from 'src/recoil/user/atoms'

interface SettingPopupProps {
   isOpen: boolean
   onClose: () => void
   projectId: string | string[] | undefined
   token?: string | null
}

interface UserInfo {
  userName: string
  email: string
}

interface MemberInfo {
  userName: string
  email: string
  permissionLevel: MemberRole
}

interface SearchResults {
  result: UserInfo[]
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-container': {
    '& .MuiPaper-root': {
      width: "100%",
      maxWidth: "700px",
      height: "100%",
      maxHeight: "560px"
    }
  }
}))

const ListTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

const ListSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const SettingPopup = (props: SettingPopupProps) => {
  const { isOpen, onClose, projectId, token } = props
  const headers = { Authorization: `Bearer ${token}` }

  const loginUser = useRecoilValue(loginUserState)
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [members, setMembers] = useState<MemberInfo[]>([])
  const [allUsers, setAllUsers] = useState<UserInfo[]>([])
  const [changeFailed,setChangeFailed] = useState(false)

  const handleProjectNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value)
  }

  const handleProjectDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectDescription(event.target.value)
  }

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.checked)
  }

  const handleInvitation = (event: React.MouseEvent, option: UserInfo) => {
    event.stopPropagation()
    setAllUsers((prevAllUsers) =>
      prevAllUsers.filter((user) => user.userName !== option.userName)
    )
    const newMember: MemberInfo = {
      userName: option.userName,
      email: option.email,
      permissionLevel: MemberRole.Editor,
    }
    setMembers((prevMembers) => [...prevMembers, newMember])
  }

  const handleDeleteButtonClick = (event: React.MouseEvent) => {
    const indexToDelete = event.currentTarget.getAttribute('data-index')
    if (indexToDelete !== null) {
      const memberToDelete = members[parseInt(indexToDelete)]
      handleDeleteMember(memberToDelete)
    }
  }

  const handleDeleteMember = (member: UserInfo) => {
    setMembers((prevMembers) => prevMembers.filter((m) => m.userName !== member.userName))
    setAllUsers((prevAllUsers) => {
      const updatedAllUsers = [...prevAllUsers, member];
      return sortUsersByName(updatedAllUsers);
    })
  }

  const handleMemberRole = (index: number) => {
    setMembers((prevMembers) => {
      const updatedMembers = [...prevMembers];
      const currentRole = updatedMembers[index].permissionLevel;
  
      updatedMembers[index].permissionLevel =
        currentRole === MemberRole.Editor
          ? MemberRole.Viewer
          : MemberRole.Editor;
  
      return updatedMembers;
    });
  }

  const handleFailDialogClose = () => {
    setChangeFailed(false);
  }
  
  const handleClickSaveButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClose();
    //수정필요
    // axios.post('/api/projects',
    // {
    //     projectName: projectName,
    //     projectDescription: projectDescription,
    //     isPublic: publicState,
    //     memberCount: members.length
    // },{
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`
    //   }
    // })
    // .then(function(response) {
    //   console.log(response);
    //   const projectID = response.data.result;
    //   const memberData = members.map((member) => ({
    //     email: member.email,
    //     permissionLevel: member.role
    //   }))
    //   axios.post(`/api/projects/${projectID}/members`, memberData, {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`
    //     }
    //   })
    //   .then(function(response) {
    //     console.log(response);
    //     onClose();
    //     window.location.href = window.location.href;
    //   }).catch(function (error) {
    //     console.error('멤버 추가 실패:', error);
    //   });
    // })
    // .catch(function (error) {
    //   console.error('프로젝트 생성 실패:', error);
    //   setChangeFailed(true);
    // });
  }

  const searchResults = (props: React.HTMLAttributes<HTMLLIElement>, option: UserInfo, state: AutocompleteRenderOptionState) => (
    <ListItem {...props} style={{justifyContent:'space-between'}}>
      <Box>
        <ListTitle>{option.userName}</ListTitle>
        <ListSubtitle>{option.email}</ListSubtitle>
      </Box>
      <Button variant="outlined" color="primary" onClick={(event) => handleInvitation(event, option)}>
        초대
      </Button>
    </ListItem>
  )

  const sortUsersByName = (users: UserInfo[]) => {
    return users.sort((a, b) => a.userName.localeCompare(b.userName))
  }

  const sortMembers = (members: MemberInfo[]) => {
    return members.slice().sort((a, b) => {
      if (a.permissionLevel === '관리자' && b.permissionLevel !== '관리자') {
        return -1;
      }
      if (a.permissionLevel !== '관리자' && b.permissionLevel === '관리자') {
        return 1;
      }
      return a.userName.localeCompare(b.userName);
    });
  };

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectResponse = await axios.get(`/api/projects/${projectId}`, { headers });
        const projectData = projectResponse.data.result;
        setProjectName(projectData.projectName);
        setProjectDescription(projectData.projectDescription);
        setIsPublic(projectData.public);
  
        const usersResponse = await axios.get<SearchResults>('/api/users', { headers });
        const sortingUsers = sortUsersByName(usersResponse.data.result);
        // const filteredUsers = sortingResult.filter(user => user.userName !== loginUser.userName);
        // setAllUsers(filteredUsers);
  
        const membersResponse = await axios.get(`/api/projects/${projectId}/members`, { headers });
        const memberData = membersResponse.data.result;
        const members = memberData.map((member: MemberInfo) => ({
          userName: member.userName,
          email: member.email,
          permissionLevel: member.permissionLevel
        }));
        const sortingMembers = sortMembers(members);
        setMembers(sortingMembers);


        const filteredUsers = sortingUsers.filter((user) => !members.some((member:any) => member.userName === user.userName));
        setAllUsers(filteredUsers);

      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };
  
    if (isOpen) {
      fetchProjectData();
    }
  }, [isOpen]);
  

  return (
    <>
    <StyledDialog open={isOpen} onClose={onClose} >

      <DialogTitle sx={{pl:7, pr:7}}>
        <Typography sx={{ fontSize: 24, fontWeight: 600 }}>프로젝트 설정</Typography>
      </DialogTitle>

      <DialogContent sx={{pl:10, pr:7}}>
        <Grid container spacing={2} sx={{alignItems: 'center'}} >
          <Grid item xs={12}>
            <TextField
            label="프로젝트명"
            value={projectName}
            onChange={handleProjectNameChange}
            variant='standard'
            sx={{width:'400px', mb:3}}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
            label="설명"
            value={projectDescription}
            onChange={handleProjectDescriptionChange}
            variant='standard'  
            multiline
            sx={{width:'400px', mb:10}}
            />
          </Grid>

          <Grid item xs={6} >
            <Typography sx={{ fontSize: 20, fontWeight: 600 }}>멤버 추가</Typography>
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              size="small"
              options={allUsers}
              getOptionLabel={(option) => option.email}
              inputValue={searchTerm}
              onInputChange={(event, newValue) => setSearchTerm(newValue)}
              filterOptions={createFilterOptions({
                stringify: (option: UserInfo) => option.email,
              })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 }}}
                  autoComplete="off"
                  placeholder="Search"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Magnify fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              renderOption={searchResults}
              ListboxProps={{
                style: {
                  maxHeight: 200,
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider/>
          </Grid>
          
          {members.map((member, index) => (
          <React.Fragment key={index}>
          <Grid item xs={7}>
            <Typography>{member.userName}</Typography>
          </Grid>
          <Grid item xs={5}>
            {index === 0 ? (
              <>
                <MemberRoleButton role={member.permissionLevel}/>
              </>
            ) : (
              <>
                <MemberRoleButton role={member.permissionLevel} onClick={() => handleMemberRole(index)} />
                <Button variant="outlined" color="error" onClick={handleDeleteButtonClick} data-index={index}>
                  삭제
                </Button>
              </>
            )}
          </Grid>
          </React.Fragment>
          ))}

          
        </Grid> 
      </DialogContent>

      <DialogActions sx={{pr:7, pb:7, justifyContent: 'space-between'}}>
        <Box sx={{display:'flex', alignItems:'center'}}>
          <Switch
            {...label}
            checked={isPublic}
            onChange={handleSwitchChange}
          />
          <Typography>공개 프로젝트</Typography>
        </Box>
        <Button variant="contained" onClick={handleClickSaveButton}>저장</Button>
      </DialogActions>

    </StyledDialog>
    <Dialog open={changeFailed} onClose={handleFailDialogClose}>
      <DialogTitle>프로젝트 수정 실패</DialogTitle>
      <DialogContent>
        <Typography>프로젝트를 수정하지 못했습니다. 다시 시도해주세요.</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleFailDialogClose} color="primary">
          확인
        </Button>
      </DialogActions>
    </Dialog>
    </>
  )
}

export default SettingPopup