import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import FormContent from './FormContent';

import { handleSave, handleDelete } from 'src/views/create-release-note/FormReleaseNoteActions';

import { releaseNoteState } from 'src/views/create-release-note/recoil/atoms';

const FormReleaseNote = () => {
  const [releaseNote, setReleaseNote] = useRecoilState(releaseNoteState);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    setReleaseNote((prevReleaseNote) => {
      return { ...prevReleaseNote, title: newTitle };
    });
  };

  return (
    <Card>
      <CardHeader
        title={
          <TextField
            id="release_note_title"
            label="릴리즈 노트 제목"
            value={releaseNote.releaseNoteTitle}
            onChange={handleTitleChange}
            variant="outlined"
            fullWidth
            InputProps={{
              inputProps: { 'aria-label': '제목 입력창' },
            }}
          />
        }
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <>
            <Button
              variant="outlined"
              type='submit'
              onClick={() => handleSave(releaseNote)}
              color="primary"
              sx={{ mr: 1, ml: 5 }}
            >
              저장
            </Button>
            <Button
              data-testid="delete-button"
              variant="outlined"
              onClick={() => handleDelete(releaseNote.releaseNoteId)}
              color="error"
            >
              삭제
            </Button>
          </>
        }
      />
      <Divider sx={{ margin: 0 }} />
      <FormContent />
    </Card>
  );
};

export default FormReleaseNote;
