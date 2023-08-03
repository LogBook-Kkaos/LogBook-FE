// FormContent.tsx
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

// import Add from 'mdi-material-ui/Add';
import Update from 'mdi-material-ui/Update';
import AccountOutline from 'mdi-material-ui/AccountOutline';

// import recoil state
import { useRecoilState, useRecoilValue } from 'recoil';
import { releaseNoteState } from 'src/recoil/release-note/atoms';
import FormReleaseContent from './FormReleaseContent';

const FormContent = () => {

    const [releaseNote, setReleaseNote] = useRecoilState(releaseNoteState);
    const [releaseContents, setTextfieldValues] = useState<string[]>(['']);

    const handleAddTextField = () => {
        setTextfieldValues([...releaseContents, '']);
    };

    return (
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
                            onClick={handleAddTextField}
                        >
                            변경사항 추가
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </CardContent>
    )
}

export default FormContent