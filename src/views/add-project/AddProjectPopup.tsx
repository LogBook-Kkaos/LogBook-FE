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
import InputAdornment from '@mui/material/InputAdornment'
import Typography, { TypographyProps } from '@mui/material/Typography'

import Magnify from 'mdi-material-ui/Magnify'

// ** HTTP Client
import axios from 'axios'

interface AddProjectPopupProps {
   isOpen: boolean
   onClose: () => void
}

interface UserInfo {
  userName: string
  email: string
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

// ** Styled component for the title in MenuItems
const ListTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

// ** Styled component for the subtitle in MenuItems
const ListSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

const AddProjectPopup = (props: AddProjectPopupProps) => {
  const { isOpen, onClose } = props
  
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [members, setMembers] = useState<UserInfo[]>([])
  const [allUsers, setAllUsers] = useState<UserInfo[]>([])

  const handleProjectNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value)
  }

  const handleProjectDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectDescription(event.target.value)
  }

  const handleInvitation = (event: React.MouseEvent, option: UserInfo) => {
    event.stopPropagation()
    setAllUsers((prevAllUsers) =>
      prevAllUsers.filter((user) => user.userName !== option.userName)
    )
    setMembers((prevMembers) => [...prevMembers, option])
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

  // 권한 변경 handler로 변경필요
  const handleSaveMember = () => {
    
  }
  
  const handleClickAddButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    // 프로젝트 생성 api
    onClose();
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

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get<SearchResults>('/api/users');
        const sortingResult = sortUsersByName(response.data.result);
        setAllUsers(sortingResult);
      } catch (error) {
        console.error('Error fetching all users:', error);
        setAllUsers([]);
      }
    }
  
    fetchAllUsers();
  }, [isOpen])

  return (
    <StyledDialog open={isOpen} onClose={onClose} >

      <DialogTitle sx={{pl:7, pr:7}}>
        <Typography sx={{ fontSize: 24, fontWeight: 600 }}>프로젝트 추가</Typography>
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
          <>
          <Grid item xs={8}>
            <Typography>{member.userName}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="outlined"
              // onClick={() => onSubmit(title)}
              color="primary"
              sx={{ mr: 3, ml: 12 }}
            >
            저장
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteButtonClick}
              data-index={index}
            >
              삭제
            </Button>
          </Grid>
          </>
          ))}

          
        </Grid> 
      </DialogContent>

      <DialogActions sx={{pr:7, pb:7}}>
        <Button variant="contained" onClick={handleClickAddButton}>프로젝트 생성</Button>
      </DialogActions>

    </StyledDialog>
  )
}

export default AddProjectPopup