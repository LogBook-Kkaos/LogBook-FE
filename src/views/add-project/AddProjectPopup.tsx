import React, { ReactNode, useState, useEffect } from 'react';

import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import { DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Typography, { TypographyProps } from '@mui/material/Typography'

import Magnify from 'mdi-material-ui/Magnify'

// ** HTTP Client
import axios from 'axios';

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

interface AddProjectPopupProps {
   isOpen: boolean
   onClose: () => void
}

interface SearchResultItem {
  userName: string | null;
  email: string;
}

interface SearchResults {
  result: SearchResultItem[];
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

const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display:'flex'
}))

const styles = {
  maxHeight: 349,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
}

const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

const MenuItemWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center'
})

const AddProjectPopup = (props: AddProjectPopupProps) => {
  const { isOpen, onClose } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [members, setMembers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResults>({ result: [] });

  const handleProjectNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value)
  };

  const handleProjectDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectDescription(event.target.value)
  };

  // ** Hook
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return (
        <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
      )
    }
  }

  useEffect(()=>{
    const fetchSearchResults = async() =>{
      try{
        const response = await axios.get<SearchResults>(`/api/users/search?keyword=${searchTerm}`);
        setSearchResults(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults({result:[]});
      }
    };

    const searchDelay = setTimeout(()=>{
      fetchSearchResults();
    },500);

    return () => clearTimeout(searchDelay);
  }, [searchTerm]);

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Magnify fontSize='small' />
                </InputAdornment>
              )
            }}
            onFocus={(e) => setAnchorEl(e.currentTarget)}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              anchorReference="anchorEl"
              //anchorPosition={{ top: 800, left: 270 }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <ScrollWrapper>
              {searchResults.result.map((item, index) => (
                <MenuItem key={index} onClick={() => setAnchorEl(null)}>
                {/* <MenuItem key={index} onClick={() => handleResultItemClick(result)}> */}
                  <MenuItemTitle>{item.email}</MenuItemTitle>
                  <MenuItemSubtitle>{item.email}</MenuItemSubtitle>
                </MenuItem>
              ))}
              </ScrollWrapper>
            </Menu>
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