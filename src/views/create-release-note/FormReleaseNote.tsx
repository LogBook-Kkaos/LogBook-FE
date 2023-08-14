// ** react Imports
import { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';

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

const FormReleaseNote = () => {
  
  const [releaseNote, setReleaseNote] = useRecoilState(releaseNoteState);
  const [releaseContents, setReleaseContents] = useState<string[]>(['']);

  const versionPattern = /^(\d+\.){2}\d+$/;

  const methods = useForm(
    {
      defaultValues: {
        creationDate: releaseNote.creationDate,
        creatorName: typeof window !== 'undefined' ? sessionStorage.getItem('userName') : null,
        releaseNoteTitle: releaseNote.releaseNoteTitle,
        releaseNoteVersion: releaseNote.version,
        releaseNoteIsImportant: releaseNote.isImportant,
        releaseNoteIsPublic: releaseNote.isPublic,
      },
    },
  );
  const { register, control, handleSubmit, setValue } = methods;


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
      <form onSubmit={
        handleSubmit((data) => {
          console.log(data);
        })
      }>
        <CardHeader
          title={
            <TextField
              id="release_note_title"
              label="릴리즈 노트 제목"
              {...register('releaseNoteTitle')}
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
                onClick={() => {}}
                color="primary"
                sx={{ mr: 1, ml: 5 }}
              >
                저장
              </Button>
              <Button
                data-testid="delete-button"
                variant="outlined"
                onClick={() => {}}
                color="error"
              >
                삭제
              </Button>
            </>
          }
        />
        <Divider sx={{ margin: 0 }} />
        <CardContent>

          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                id="creator_id"
                label='작성자'
                {...register('creatorName')}
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
                    ...register('creationDate')
                  }}
                  renderInput={params => <TextField {...params} />}
                  disabled={true}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name='releaseNoteVersion'
                rules={{ pattern: versionPattern }} // 버전 유효성 검사 추가
                render={({ field }) => {
                  const hasError = !field.value.match(versionPattern);
                  return (
                    <TextField
                      type='version'
                      label='버전'
                      placeholder='x.y.z'
                      helperText={
                        hasError
                          ? '올바른 버전 형식이 아닙니다. x.y.z 형식으로 입력해주세요.'
                          : 'Major 업데이트의 경우 x를, Minor 업데이트의 경우 y를, Patch 업데이트의 경우 z를 바꿔주세요.'
                      }
                      error={hasError} // 버전 입력이 올바르지 않으면 에러 표시
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Update />
                          </InputAdornment>
                        ),
                      }}
                      {...field}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    name="releaseNoteIsImportant"
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            id="is_important"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            color="primary"
                          />
                        }
                        label="중요한 변경사항으로 등록"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    name="releaseNoteIsPublic"
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            id="is_public"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            color="primary"
                          />
                        }
                        label="외부인에게 공개"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            {releaseContents.map((value, index) => (
              <FormReleaseContent key={index} index={index} methods={methods}/>
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

        </CardContent>
      </form>
    </Card>
  );
};

export default FormReleaseNote;
