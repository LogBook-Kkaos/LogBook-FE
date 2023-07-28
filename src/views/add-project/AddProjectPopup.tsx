import React, { useState } from 'react';

import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { DialogActions, DialogContent, DialogTitle, Divider, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment'

import Magnify from 'mdi-material-ui/Magnify'

interface AddProjectPopupProps {
   isOpen: boolean
   onClose: () => void
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
}));

const AddProjectPopup = (props: AddProjectPopupProps) => {
  const { isOpen, onClose } = props
  
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [members, setMembers] = useState<string[]>([]);

  const handleProjectNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value)
  };

  const handleProjectDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectDescription(event.target.value)
  };

  const handleSaveMember = () => {
    // 저장 버튼을 클릭할 때 실행되는 함수
    if (projectName) {
      setMembers([...members, projectName]); // 새로운 멤버 정보를 배열에 추가
    }
  };
  
  const handleClickAddButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Adding project:', projectName);
    onClose();
  }

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
            <TextField
            size='small'
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 }, ml: 9 }}
            placeholder='Search'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Magnify fontSize='small' />
                </InputAdornment>
              )
            }}
            />
          </Grid>
  
          <Grid item xs={12}>
            <Divider/>
          </Grid>

          <Grid item xs={8}>
            <Typography>member1</Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="outlined"
              onClick={handleSaveMember}
              color="primary"
              sx={{ mr: 3, ml: 12 }}
            >
            저장
            </Button>
            <Button variant="outlined" color="error">
              삭제
            </Button>
          </Grid>
          {members.map((member, index) => (
            <>
            <Grid item xs={8}>
            <Typography>{member}</Typography>
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
            <Button variant="outlined" color="error">
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