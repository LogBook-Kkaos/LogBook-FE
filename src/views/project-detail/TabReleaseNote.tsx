// ** React Imports
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { tokensState } from 'src/recoil/auth/atoms'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

// ** Custom Components Imports
import CategoryTag, { Category, CategoryType } from 'src/views/project-detail/CategoryTag'
import ReleaseNoteDetailModal from './ReleaseNoteDetailModal'

// ** Icons Imports
import Sort from 'mdi-material-ui/sort'
import Filter from 'mdi-material-ui/filter'
import Magnify from 'mdi-material-ui/Magnify'


import axios from 'axios'
import { useEffect } from 'react'

interface Creator {
  creatorId: string,
  userName: string,
}

export interface ReleaseNote {
  releaseNoteId: number,
  creator: Creator,
  version: string,
  releaseTitle: string,
  releaseContents: ReleaseContent[],
  creationDate: string,
}

interface ReleaseContent {
  category: CategoryType,
  releaseSummary: string,
  documentLink?: string,
}

interface TabReleaseProps {
  projectId: string,
  permissionLevel: string,
}


function handleTitleClick(releaseNote: ReleaseNote) {
  console.log(releaseNote.releaseNoteId);
}

const TabReleaseNote: React.FC<TabReleaseProps> = ({ projectId, permissionLevel }) => {
  const { accessToken } = useRecoilValue(tokensState)
  
  const headers = { Authorization: `Bearer ${accessToken}` }
  const router = useRouter();
  const [releaseNotes, setReleaseNotes] = useState<ReleaseNote[]>([]);
  const [selectedReleaseNote, setSelectedReleaseNote] = useState<ReleaseNote | null>(null);
  const [keyword, setKeyword] = useState('');



  const createRowFromReleaseNote = (releaseNote: ReleaseNote, index: number) => {
    const { releaseNoteId, version, releaseTitle, releaseContents, creator, creationDate } = releaseNote;
    const formattedDate = new Date(creationDate).toLocaleDateString();

    return (
      <TableRow key={index}>
        <TableCell component='th' scope='row'>
          {releaseNotes.length - index}
        </TableCell>
        <TableCell align='left'>v {version}</TableCell>
        <TableCell align='left' onClick={() => onReleaseNoteClicked(releaseNote.releaseNoteId)} sx={{ cursor: "pointer" }}>
          <Typography variant="subtitle2" sx={{ marginBottom: 1 }}><strong>{releaseTitle}</strong></Typography>
          {releaseContents.map((item, index) => (
            <Box key={index} sx={{ marginBottom: 1 }}>
              <CategoryTag category={item.category} />
              <span>{item.releaseSummary}</span>
            </Box>
          ))}
        </TableCell>
        <TableCell align='left'>
          {creator.userName}
        </TableCell>
        <TableCell align='left'>
          {formattedDate}
        </TableCell>
      </TableRow>
    )
  }

  const fetchReleaseNotes = async () => {

    try {
      const response = await axios.get(`/api/projects/${projectId}/release_notes`,
        { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'), } }
      );
      const sortedResult = response.data.result.sort((a: ReleaseNote, b: ReleaseNote) => {
        const dateA = new Date(a.creationDate);
        const dateB = new Date(b.creationDate);
        return dateB.getTime() - dateA.getTime();
      });

      setReleaseNotes(sortedResult);
    } catch (error) {
      console.log(error);
    }
  }


  const onReleaseNoteClicked = async (releaseNoteId: number) => {
    try {
      const response = await axios.get(`/api/projects/${projectId}/release_notes/${releaseNoteId}`,
        { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'), } }
      );
      setSelectedReleaseNote(response.data.result);
    } catch (error) {
      console.log(error);
    }
  }
  const handleCreate = () => {
    router.push({
        pathname: "/create-release-note",
        query: { projectId: projectId }
    });
  }

  const handleSearch = async() => {
    try{
      const response = await axios.get(`/api/projects/${projectId}/release_notes/search/${keyword}`, { headers });
      if (Array.isArray(response.data.result)) {
        const sortedResult = response.data.result.sort((a: ReleaseNote, b: ReleaseNote) => {
          const dateA = new Date(a.creationDate);
          const dateB = new Date(b.creationDate);
          return dateB.getTime() - dateA.getTime();
        });
        setReleaseNotes(sortedResult);
      } else {
        console.error('Invalid API response:', response.data);
      }
    } catch (error) {
    console.error('Error searching documents:', error);
    }
  }


  useEffect(() => {
    fetchReleaseNotes();
  }, [])

  //style component
  const IconButtonStyle = {
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: 10,
    padding: 8,
    marginRight: 16
  };



  return (
    <Box>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={12}>
        <Grid container sx={{ width: '100%',mt:3, justifyContent: 'space-between', alignItems: 'center' }}>
            <div>

                <IconButton style={IconButtonStyle}>
                    <Sort />
                </IconButton>
                <IconButton style={IconButtonStyle}>
                    <Filter />
                </IconButton>
                <TextField
                    size='small'
                    sx={{ '& .MuiOutlinedInput-root': { mr: 4, borderRadius: 4 } }}
                    placeholder='Search'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <Magnify fontSize='small' />
                            </InputAdornment>
                        )
                    }}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <Button
                variant="contained"
                color="primary"
                sx={{
                    mr:4,
                    borderRadius: 1,
                }}
                onClick={handleSearch}
                >
                검색
            </Button>
            </div>
            {permissionLevel === '뷰어' ? null : (
            <Button
                variant="contained"
                color="primary"
                sx={{
                    mr:4,
                    borderRadius: 1,
                }}
                onClick={handleCreate}
            >
                릴리즈 노트 생성
            </Button>
            )}
        </Grid>
          <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 400px)', position: 'relative', marginTop: '10px' }}>
            <Table sx={{ minWidth: 650 }} aria-label='project detail table'>
              <TableHead>
                <TableRow>
                  <TableCell>번호</TableCell>
                  <TableCell align='left'>버전</TableCell>
                  <TableCell align='left'>변경사항</TableCell>
                  <TableCell align='left'>작성자</TableCell>
                  <TableCell align='left'>날짜</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {releaseNotes.map((releaseNote, index) => createRowFromReleaseNote(releaseNote, index))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      {selectedReleaseNote && <ReleaseNoteDetailModal releaseNote={selectedReleaseNote} onClose={() => setSelectedReleaseNote(null)} />}
    </Box>
  )
}

export default TabReleaseNote
