// ** React Imports
import React, { useState } from 'react'

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

// ** Custom Components Imports
import CategoryTag, { Category, CategoryType } from 'src/views/project-detail/CategoryTag'
import UpperButtons from './UpperButtons'
import ReleaseNoteDetailModal from './ReleaseNoteDetailModal'

import axios from 'axios'
import { useEffect } from 'react'

const createReleaseNoteData = (releaseNoteId: number, version: string, releaseTitle: string, changeItems: ReleaseContent[], creatorId: string, creationDate: string) => {
  return { releaseNoteId, version, releaseTitle, changeItems, creatorId, creationDate }
}

interface Creator {
  creatorId: string;
  userName: string;
}

export interface ReleaseNote {
  releaseNoteId: number;
  creator: Creator;
  version: string;
  releaseTitle: string;
  releaseContents: ReleaseContent[];
  creationDate: string;
}

interface ReleaseContent {
  category: CategoryType,
  releaseSummary: string,
  documentLink?: string
}

interface TabReleaseProps {
  projectId: string; 
  permissionLevel: string;
}

function handleTitleClick(releaseNote: ReleaseNote) {
  console.log(releaseNote.releaseNoteId);
}

const TabReleaseNote: React.FC<TabReleaseProps> = ({ projectId, permissionLevel }) => {
  const [releaseNotes, setReleaseNotes] = useState<ReleaseNote[]>([]);
  const [selectedReleaseNote, setSelectedReleaseNote] = useState<ReleaseNote | null>(null);

  const createRowFromReleaseNote = (releaseNote: ReleaseNote, index: number) => {
    const { releaseNoteId, version, releaseTitle, releaseContents, creator, creationDate } = releaseNote;
    const formattedDate = new Date(creationDate).toLocaleDateString();
    return (
      <TableRow key = {index}>
        <TableCell component='th' scope='row'>
        {releaseNotes.length - index}
        </TableCell>
        <TableCell align='left'>v {version}</TableCell>
        <TableCell align='left' onClick={() => onReleaseNoteClicked(releaseNote.releaseNoteId)} sx={{cursor: "pointer"}}>
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
    { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),} }
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
      { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),} }
      );
      setSelectedReleaseNote(response.data.result);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchReleaseNotes();
  }, [])





  return (
    <Box>
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item xs={12}>
        <UpperButtons createButtonLabel="릴리즈 노트 생성" routerPath="/create-release-note" projectId={projectId} permissionLevel={permissionLevel}/>
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
