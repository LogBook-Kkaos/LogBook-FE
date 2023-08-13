import { useRouter } from 'next/router';
import axios from 'axios';

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import Button, { ButtonProps }  from '@mui/material/Button'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import DocumentContent from 'src/views/document-detail/DocumentContent';

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'


const Document = () => {

  const router = useRouter();
  const { documentId, projectId } = router.query;

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/projects/${projectId}/documents/${documentId}`);
      if (response.status === 200) {
        router.push(`/project-detail/${projectId}`);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handleEdit = () => {
    router.push(`/create-document?projectId=${projectId}&documentId=${documentId}`);
  };


  return (
    <DatePickerWrapper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: 2, 
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ marginRight: 2 }}
          onClick={handleDelete}
        >
          삭제
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleEdit}
        >
          수정
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card variant="outlined" sx={{ width: '100%' }}>
          <DocumentContent/>
        </Card>
      </Box>

    </DatePickerWrapper>
  )
}

export default Document;



