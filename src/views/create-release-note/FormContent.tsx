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

import CategoryTag, { CategoryType } from 'src/views/create-release-note/CategoryTag';
import StatusTag, { Status } from 'src/views/create-release-note/StatusTag';

// import recoil state
import { useRecoilState, useRecoilValue } from 'recoil';
import { releaseNoteState } from 'src/views/create-release-note/recoil/atoms';

const keywords = [
    {
        label: 'Feature',
        keywords: ['Feature', '기능'],
    },
    {
        label: 'Changed',
        keywords: ['Changed', '변경'],
    },
    {
        label: 'Deprecated',
        keywords: ['Deprecated', '중단', '삭제'],
    },
    {
        label: 'Fixed',
        keywords: ['Fixed', '수정'],
    },
];

const FormContent = () => {
    const [categoryTags, setCategoryTags] = useState<string[][]>([]);

    const [releaseNote, setReleaseNote] = useRecoilState(releaseNoteState);

    const [textfieldValues, setTextfieldValues] = useState<string[]>(['']);

    useEffect(() => {
        const newCategoryTags = textfieldValues.map(textfieldValue => {
            const foundKeywords: { keyword: string; label: string }[] = [];

            keywords.forEach(keywordSet => {
                keywordSet.keywords.forEach(keyword => {
                    const keywordIndex = textfieldValue.toLowerCase().indexOf(keyword.toLowerCase());
                    if (keywordIndex !== -1) {
                        foundKeywords.push({ keyword, label: keywordSet.label });
                    }
                });
            });

            foundKeywords.sort((a, b) => {
                return textfieldValue.toLowerCase().indexOf(a.keyword.toLowerCase()) - textfieldValue.toLowerCase().indexOf(b.keyword.toLowerCase());
            });

            return foundKeywords.length > 0 ? [foundKeywords[0].label] : ['General'];
        });

        setCategoryTags(newCategoryTags);
    }, [textfieldValues]);




    const handleAddTextField = () => {
        setTextfieldValues([...textfieldValues, '']);
    };

    const handleTextfieldChange = (index: number, value: string) => {
        setTextfieldValues(
            textfieldValues.map((textfieldValue, i) =>
              i === index ? value : textfieldValue
            )
          );
      
          setReleaseNote((prevReleaseNote) => {
            const newReleaseContent = prevReleaseNote.releaseContent.slice();
            newReleaseContent[index] = {
              content: value,
              category: categoryTags[index]
                ? categoryTags[index][0]
                : "General",
            };
      
            return {
              ...prevReleaseNote,
              releaseContent: newReleaseContent,
            };
          });
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
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select label='Status'>
                                <MenuItem value='NotStarted'><StatusTag status="시작 전" /></MenuItem>
                                <MenuItem value='InProgress'><StatusTag status="진행중" /></MenuItem>
                                <MenuItem value='Done'><StatusTag status="완료" /></MenuItem>
                            </Select>
                        </FormControl>
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

                    {textfieldValues.map((value, index) => (
                        <Grid item xs={12}>
                            <Grid item xs={12} key={index}>

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id={`release_note_content_${index}`}
                                    fullWidth
                                    multiline
                                    minRows={2}
                                    label={`변경사항 ${index + 1}`}
                                    value={value}
                                    onChange={(e) => handleTextfieldChange(index, e.target.value)}
                                    placeholder="변경사항을 작성해주세요..."
                                    sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                                    {categoryTags[index]?.map(category => (
                                                        <CategoryTag key={category} category={category as CategoryType} />
                                                    ))}
                                                </Box>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                            </Grid>
                        </Grid>
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