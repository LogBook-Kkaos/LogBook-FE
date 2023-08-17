import React, { useState, useEffect } from 'react';
import { Form, UseFormRegister, UseFormReturn, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import CategoryTag, { CategoryType } from 'src/views/create-release-note/CategoryTag';
import { IconButton } from '@mui/material';


import Delete from 'mdi-material-ui/Delete'

export interface FormReleaseContentProps {
  index: number;
  methods: UseFormReturn<any>;
  field: any;
  removeContent: () => void;
}

const FormReleaseContent: React.FC<FormReleaseContentProps> = ({ index, methods, field, removeContent}) => {
  const { register, setValue, watch } = methods;
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('General');

  const changeText = watch(`releaseContents.${index}.releaseSummary`, '');

  useEffect(() => {
    const assignCategory = (text: string) => {
      if (text.includes('수정')) {
        setSelectedCategory('Fixed');
      } else if (text.includes('기능')) {
        setSelectedCategory('Feature');
      } else if (text.includes('개선')) {
        setSelectedCategory('Changed');
      } else if (text.includes('삭제') || text.includes('중단')) {
        setSelectedCategory('Deprecated');
      } else {
        setSelectedCategory('General');
      }
    };

    assignCategory(changeText);
    setValue(`releaseContents.${index}.category`, selectedCategory);
  }, [changeText, index, selectedCategory, setValue]);
  

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSelectedCategory('General');

    setValue(`releaseContents.${index}.releaseSummary`, value, { shouldValidate: true });
  };

  return (
    <Grid item xs={12}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          minRows={2}
          label={`변경사항 ${index + 1}`}
          placeholder="변경사항을 작성해주세요..."
          sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
          {...register(`releaseContents.${index}.releaseSummary`)}
          onChange={handleTextFieldChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  <CategoryTag key={selectedCategory} category={selectedCategory} />
                </Box>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid container item xs={12} spacing={1}>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register(`releaseContents.${index}.documentLink`)}
            fullWidth
            placeholder="연관된 기술문서 링크를 입력해주세요"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <IconButton onClick={removeContent} aria-label='삭제'>
            <Delete />
          </IconButton>
          </Grid>
      </Grid>
    </Grid>
  );
};

export default FormReleaseContent;
