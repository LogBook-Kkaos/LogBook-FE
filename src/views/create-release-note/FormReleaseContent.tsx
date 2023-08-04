import React, { useState, useEffect } from 'react';
import { Form, UseFormRegister, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import CategoryTag, { CategoryType } from 'src/views/create-release-note/CategoryTag';

export interface FormReleaseContentProps {
  index: number;
  register: UseFormRegister<any>;
}

const FormReleaseContent: React.FC<FormReleaseContentProps> = ({ index, register}) => {
  const { setValue, watch } = useForm();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('General');

  const changeText = watch(`releaseContent.${index}.releaseSummary`, '');

  useEffect(() => {
    const assignCategory = (text: string) => {
      if (text.includes('버그 수정') || text.includes('개선 사항')) {
        setSelectedCategory('Fixed');
      } else if (text.includes('새로운 기능')) {
        setSelectedCategory('Feature');
      } else if (text.includes('성능 개선')) {
        setSelectedCategory('Changed');
      } else {
        setSelectedCategory('General');
      }
    };

    assignCategory(changeText);
    setValue(`releaseContent.${index}.category`, selectedCategory);
  }, [changeText, index, selectedCategory, setValue]);
  

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // Update category
    setSelectedCategory('General');

    // Update form state
    setValue(`releaseContent.${index}.releaseSummary`, value, { shouldValidate: true });
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
          {...register(`releaseContent.${index}.releaseSummary`)}
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
            {...register(`releaseContent.${index}.documentLink`)}
            fullWidth
            placeholder="연관된 기술문서 링크를 입력해주세요"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormReleaseContent;
