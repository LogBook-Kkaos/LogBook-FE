  import { useState, useEffect } from "react";
  import { useRouter } from 'next/router';
  import axios from 'axios';
  import { Editor } from "react-draft-wysiwyg";
  import {
    EditorState,
    ContentState,
    convertFromHTML,
    convertToRaw
  } from "draft-js";
  import { stateToHTML } from "draft-js-export-html"; 
  import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
  import dynamic from 'next/dynamic';

  // ** MUI Imports
  import Box from '@mui/material/Box'
  import Typography from '@mui/material/Typography'
  import TextField from '@mui/material/TextField';
  import { styled } from '@mui/material/styles'
  import MuiDivider, { DividerProps } from '@mui/material/Divider'
  import Button, { ButtonProps }  from '@mui/material/Button'
  import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

  const DynamicEditor = dynamic(() => import('react-draft-wysiwyg').then((module) => module.Editor), {
    ssr: false
  });

  interface FormDocumentProps {
    projectId: string; 
  }
  
  interface ModalInfo {
    open: boolean
    message: string
    messageDescription: string
    color: string
  }

  const FormDocument: React.FC<FormDocumentProps> = ({ projectId }) => {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [oldCode, setOldCode] = useState(`<p> <strong>문서 내용</strong>을 채워주세요!</p>`);
    const [modalInfo, setModalInfo] = useState<ModalInfo>({ open: false, message: '', messageDescription: '', color: '' });
    const [editorState, setEditorState] = useState(EditorState.createEmpty());


    const closeModal = () => {
      setModalInfo({ open: false, message: '', messageDescription: '', color: '' });
      router.push("/project-detail/" + projectId);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    };

    useEffect(() => {
      const blocksFromHTML = convertFromHTML(oldCode);
      const state = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
      setEditorState(EditorState.createWithContent(state));
    }, [oldCode]);

    const onEditorStateChange = (state: EditorState) => {
      setEditorState(state);
      const htmlContent = stateToHTML(state.getCurrentContent());
    };

    const extractImageUrlsFromContent = (htmlContent: string) => {
      const doc = new DOMParser().parseFromString(htmlContent, "text/html");
      const imgElements = doc.querySelectorAll("img");
      const imageUrls = Array.from(imgElements).map((img) => img.src);
      return imageUrls;
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


    //axios
    const handleAutoRelease = async () => {
      const htmlContent = stateToHTML(editorState.getCurrentContent());
    
      const requestData = {
        documentTitle: title,
        documentContent: htmlContent,
        imageUrlList: extractImageUrlsFromContent(htmlContent)
      };
      try {
        const response = await axios.post(`/api/projects/${projectId}/documents`, requestData);
        console.log("Document saved:", response.data);
        setModalInfo({
          open: true,
          message: '기술문서 저장',
          messageDescription: '기술문서를 저장했습니다.',
          color: 'success'
        });
      } catch (error) {
        console.error("Error saving document:", error);
      }
    };
  
    const handleSaveLater = async () => {
      const htmlContent = stateToHTML(editorState.getCurrentContent());
      const requestData = {
        documentTitle: title,
        documentContent: htmlContent,
        imageUrlList: extractImageUrlsFromContent(htmlContent)
      };
  
      try {
        const response = await axios.post(`/api/projects/${projectId}/documents`, requestData);
        console.log("Document saved for later:", response.data);
        
        setModalInfo({
          open: true,
          message: '기술문서 저장',
          messageDescription: '기술문서를 저장했습니다.',
          color: 'success'
        });
        
      } catch (error) {
        console.error("Error saving document for later:", error);
      }
    };

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
        <Box sx={{ minWidth: 38, justifyContent: 'center', p:'1.25rem' }}>
          <DynamicEditor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={onEditorStateChange}
          />
        </Box>

        <Box sx={{ minWidth: 50, display: 'flex', justifyContent: 'right', p:3 }}>
          <ButtonStyled variant='contained' onClick={handleAutoRelease}>
            자동 Release note 생성
            <input
              hidden
              type='file'
              accept='image/png, image/jpeg'
              id='account-settings-upload-image'
            />
          </ButtonStyled>
          <ButtonStyled variant='contained' onClick={handleSaveLater}>
            나중에 생성
            <input
              hidden
              type='file'
              accept='image/png, image/jpeg'
              id='account-settings-upload-image'
            />
          </ButtonStyled>
        </Box>
        <Dialog
        open={modalInfo.open}
        onClose={closeModal}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{modalInfo.message}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description' style={{ color: modalInfo.color }}>
            {modalInfo.messageDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color='primary' autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
  }

  export default FormDocument;
