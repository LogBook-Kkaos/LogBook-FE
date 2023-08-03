
import { useState } from "react";

// ** Editor Imports
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  ContentState,
  convertFromHTML
} from "draft-js";
import { stateToHTML } from "draft-js-export-html"; 
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles'
import MuiDivider, { DividerProps } from '@mui/material/Divider'
import Button, { ButtonProps }  from '@mui/material/Button'



const FormDocument = () => {
  const [title, setTitle] = useState('');


  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  

  const [
    oldCode,
    setOldCode
  ] = useState(`<p> <strong>문서 내용</strong>을 채워주세요!</p>`);


  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(oldCode).contentBlocks)
    )
  );

  const [htmlContent, setHtmlContent] = useState('');

  const onEditorStateChange = (state: EditorState) => {
    setEditorState(state);
    const htmlContent = stateToHTML(state.getCurrentContent());
    console.log(htmlContent);
    setHtmlContent(htmlContent);
  };



  // Styled Divider component
  const Divider = styled(MuiDivider)<DividerProps>(({ theme }) => ({
    margin: theme.spacing(5, 0),
    borderRight: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('md')]: {
      borderRight: 'none',
      margin: theme.spacing(0, 5),
      borderBottom: `1px solid ${theme.palette.divider}`
    }
  }))

  const ButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
    margin: theme.spacing(4.5),
    width: 210,
  }))

  return (
    <div>
      <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'left', pl:'1.25rem', pt:'1.25rem'}}>
        <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>Title</Typography>
      </Box>
      <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'left', p:'1.25rem'}}>
        <TextField
            id = "document_title"
            label="기술 노트 제목"
            value={title}
            onChange={handleTitleChange}
            variant="outlined"
            fullWidth
            InputProps={{ 
              inputProps: { 'aria-label': '제목 입력창' }}
          }
          />
      </Box>
      <Divider flexItem/>
      <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'left', pl:'1.25rem' }}>
        <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>Content</Typography>
      </Box>
      <Box sx={{ minWidth: 38, justifyContent: 'centor', p:'1.25rem' }}>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
        />
      </Box>

      <Box sx={{ minWidth: 50, display: 'flex', justifyContent: 'right', p:3 }}>
        <ButtonStyled variant='contained'>
          자동 Release note 생성
          <input
            hidden
            type='file'
            accept='image/png, image/jpeg'
            id='account-settings-upload-image'
          />
        </ButtonStyled>
        <ButtonStyled variant='contained'>
          나중에 생성
          <input
            hidden
            type='file'
            accept='image/png, image/jpeg'
            id='account-settings-upload-image'
          />
        </ButtonStyled>
      </Box>
      <Box sx={{ p: '1.25rem', backgroundColor: '#f0f0f0' }}>
        <Typography variant='h6' sx={{ fontWeight: 600, marginBottom: 1.5 }}>변환된 HTML 내용</Typography>
        <pre>{htmlContent}</pre>
      </Box>
    </div>
  );
}
export default FormDocument;
