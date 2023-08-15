// ** react Imports
import { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';

// ** Next Imports
import { useRouter } from 'next/router';

// ** HTTP Clients
import axios from 'axios';

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
import { CategoryType } from './CategoryTag';
import { Category } from './CategoryTag';

interface GetMemberIdParams {
  projectId: string;
  email: string;
}

interface ReleaseNoteDataTypes {
  creationDate: Date;
  creatorName: string;
  releaseNoteTitle: string;
  releaseNoteVersion: string;
  releaseNoteIsImportant: boolean;
  releaseNoteIsPublic: boolean;
  releaseContents: Array<{
    releaseSummary: string;
    category: CategoryType;
    documentLink: string;
  }>;
}

const FormReleaseNote = () => {

  const [releaseNote, setReleaseNote] = useRecoilState(releaseNoteState);
  const [releaseContents, setReleaseContents] = useState<string[]>(['']);

  const versionPattern = /^(\d+\.){2}\d+$/;

  const methods = useForm<ReleaseNoteDataTypes>(
    {
      defaultValues: {
        creationDate: new Date(releaseNote.creationDate),
        creatorName: typeof window !== 'undefined' ? sessionStorage.getItem('userName') ?? undefined : undefined,
        releaseNoteTitle: releaseNote.releaseNoteTitle,
        releaseNoteVersion: releaseNote.version,
        releaseNoteIsImportant: releaseNote.isImportant,
        releaseNoteIsPublic: releaseNote.isPublic,
        releaseContents: [],
      },
    },
  );
  const { register, control, handleSubmit, setValue } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'releaseContents',
  });


  const handleReleaseContents = () => {
    append({ releaseSummary: '', category: Category.General, documentLink: '' });
  };


  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;

    setReleaseNote((prevReleaseNote) => {
      return { ...prevReleaseNote, releaseNoteTitle: title };
    });
  };

  const router = useRouter();

  const projectId = router.query.projectId;

  async function getMemberId(params: GetMemberIdParams):Promise<string> {
    const { projectId, email } = params;
    const response = await axios
      .get(`/api/projects/${projectId}/members/info`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
        params: {
          email: email,
        }
      }
      );
    const { result: memberId } = response.data;

    return memberId;


  }

  const onSubmit = async (data: ReleaseNoteDataTypes) => {
    if (data.releaseContents.length === 0) {
      alert('적어도 하나의 릴리즈 콘텐츠가 필요합니다!');
      return;
    }
    
    try {

      const creatorId = await getMemberId({ projectId: projectId as string, email: sessionStorage.getItem('email') as string });
      
      const requestData = {
        creator: {
          creatorId: creatorId,
          creatorName: data.creatorName,
        },
        releaseTitle: data.releaseNoteTitle,
        creationDate: data.creationDate,
        version: data.releaseNoteVersion,
        important: data.releaseNoteIsImportant,
        public: data.releaseNoteIsPublic,
        releaseContents: data.releaseContents,
      }

      console.log(requestData);
      
      const response = await axios
      .post(`/api/projects/${projectId}/release_notes`, 

        requestData
      ,
      {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      }
      );

      const { result: releaseNoteId } = response.data;

      console.log(`릴리즈 노트 생성 완료. ID: ${releaseNoteId}`);

      router.push(`/projects/${projectId}/release_notes`);
    } catch (error) {
      // 에러가 발생하면 콘솔에 에러 출력
      console.error('릴리즈 노트 생성 중 문제가 발생했습니다: ', error);
    }
  };


  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader
          title={
            <TextField
              id="release_note_title"
              label="릴리즈 노트 제목"
              {...register('releaseNoteTitle', {
                required: '제목을 입력해주세요.',
              })}
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
                onClick={() => { }}
                color="primary"
                sx={{ mr: 1, ml: 5 }}
              >
                저장
              </Button>
              <Button
                data-testid="delete-button"
                variant="outlined"
                onClick={() => { }}
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
  rules={{ 
    pattern: versionPattern,
    required: '버전은 필수 항목입니다.' // 이 부분을 추가하세요.
  }}
  render={({ field }) => {
    // 버전 에러 메시지를 추가
    const errorMsg = (() => {
      if (!field.value) return '버전은 필수 항목입니다.';
      if (!field.value.match(versionPattern)) return '올바른 버전 형식이 아닙니다. x.y.z 형식으로 입력해주세요.';
      return '';
    })();

    return (
      <TextField
        type='version'
        label='버전'
        placeholder='x.y.z'
        helperText={
          errorMsg
        }
        error={!!errorMsg} // 버전 입력이 올바르지 않거나 비어있으면 에러 표시
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

            {fields.map((field, index) => (
              <FormReleaseContent key={field.id} index={index} methods={methods} field={field} removeContent={() => remove(index)} />
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
