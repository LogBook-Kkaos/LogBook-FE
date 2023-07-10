import React, { useState } from 'react';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface FormHeaderProps {
  onSubmit: (title: string) => void;
  onDelete: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({ onSubmit, onDelete }) => {
  const [title, setTitle] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <CardHeader
      title={
        <TextField
          label="릴리즈 노트 제목"
          value={title}
          onChange={handleTitleChange}
          variant="outlined"
          fullWidth
          InputProps={{ 
            inputProps: { 'aria-label': '제목 입력창' }}
        }
        />
      }
      titleTypographyProps={{ variant: 'h6' }}
      action={
        <>
          <Button
            variant="outlined"
            onClick={() => onSubmit(title)}
            color="primary"
            sx={{ mr: 1, ml: 5 }}
          >
            저장
          </Button>
          <Button variant="outlined" onClick={onDelete} color="error">
            삭제
          </Button>
        </>
      }
    />
  );
};

export default FormHeader;
