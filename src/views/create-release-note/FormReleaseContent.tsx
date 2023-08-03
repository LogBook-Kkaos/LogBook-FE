import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import CategoryTag, { CategoryType } from 'src/views/create-release-note/CategoryTag';
export interface ChangeItemProps {
  index: number;
  categoryTags: string[][];
}

const FormReleaseContent: React.FC<ChangeItemProps> = ({ index, categoryTags }) => {
  const { register, setValue } = useForm();

  return (
    <Grid item xs={12}>
      <Grid item xs={12}>
        <TextField
          {...register(`releaseContent.${index}.content`)}
          fullWidth
          multiline
          minRows={2}
          label={`변경사항 ${index + 1}`}
          placeholder="변경사항을 작성해주세요..."
          sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {categoryTags[index]?.map((category) => (
                    <CategoryTag key={category} category={category as CategoryType} />
                  ))}
                </Box>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...register(`releaseContent.${index}.documentLink`)}
          fullWidth
          placeholder="연관된 기술문서 링크를 입력해주세요"
        />
      </Grid>
    </Grid>
  );
};

export default FormReleaseContent;