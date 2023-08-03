// ** react Imports
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// ** MUI Imports
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// import Add from 'mdi-material-ui/Add';
import Update from 'mdi-material-ui/Update';
import AccountOutline from 'mdi-material-ui/AccountOutline';

// import recoil state
import { useRecoilState, useRecoilValue } from 'recoil';
import { releaseNoteState } from 'src/recoil/release-note/atoms';
import FormReleaseContent from './FormReleaseContent';

import { handleSave, handleDelete } from 'src/views/create-release-note/FormReleaseNoteActions';

const FormReleaseNote = () => {
  const [releaseNote, setReleaseNote] = useRecoilState(releaseNoteState);
  const [releaseContents, setReleaseContents] = useState<string[]>(['']);

  const handleReleaseContents = () => {
      setReleaseContents([...releaseContents, '']);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;

    setReleaseNote((prevReleaseNote) => {
      return { ...prevReleaseNote, releaseNoteTitle: title };
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
      <CardContent>
            <form onSubmit={e => e.preventDefault()}>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <TextField
                            id="creator_id"
                            fullWidth
                            label='작성자'
                            value={releaseNote.creatorId}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <AccountOutline />
                                    </InputAdornment>
                                )
                            }}
                            disabled={true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider
                            data-testid="creation_date"
                            dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label='작성날짜'
                                inputFormat='yyyy-MM-dd'
                                mask='____-__-__'
                                value={releaseNote.creationDate}
                                onChange={() => { }}
                                InputProps={{
                                    readOnly: true,
                                }}
                                renderInput={params => <TextField {...params} />}
                                disabled={true}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type='version'
                            label='버전'
                            placeholder='v x.y.z'
                            helperText='Major 업데이트의 경우 x를, Minor 업데이트의 경우 y를, Patch 업데이트의 경우 z를 바꿔주세요.'
                            value={releaseNote.version}
                            onChange={(e) => setReleaseNote({ ...releaseNote, version: e.target.value })}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <Update />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id="is_important"
                                            checked={releaseNote.isImportant}
                                            onChange={(e) => setReleaseNote({ ...releaseNote, isImportant: e.target.checked })}
                                            color="primary"
                                        />
                                    }
                                    label="중요한 변경사항으로 등록"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id="is_public"
                                            checked={releaseNote.isPublic}
                                            onChange={(e) => setReleaseNote({ ...releaseNote, isPublic: e.target.checked })}
                                            color="primary"
                                        />
                                    }
                                    label="외부인에게 공개"
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    {releaseContents.map((value, index) => (
                        <FormReleaseContent key={index} index={index} />
                    ))}

                    <Grid item xs={12}>
                        <Button
                            data-testid="add_textfield_button"
                            variant="outlined"
                            color="primary"
                            onClick={handleReleaseContents}
                        >
                            변경사항 추가
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </CardContent>
    </Card>
  );
};

export default FormReleaseNote;
