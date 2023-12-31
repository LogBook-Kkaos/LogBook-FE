import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil'
import { tokensState } from 'src/recoil/auth/atoms'
import axios from 'axios';

// ** MUI Imports
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box'
import MuiDivider, { DividerProps } from '@mui/material/Divider';


const Divider = styled(MuiDivider)<DividerProps>(({ theme }) => ({
  margin: theme.spacing(2, 0),
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    borderRight: 'none',
    margin: theme.spacing(0, 5),
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}));

const DocumentContent = () => {

  const [documentInfo, setDocumentInfo] = useState(null);
  const { accessToken } = useRecoilValue(tokensState)
  const headers = { Authorization: `Bearer ${accessToken}` }
  const router = useRouter();
  const { documentId, projectId } = router.query;


  useEffect(() => {
    axios.get(`/api/projects/${projectId}/documents/${documentId}`, { headers })
      .then(response => {
        setDocumentInfo(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching document:', error);
      });
  }, [projectId, documentId]);

  if (!documentInfo) {
    return <Typography>Loading...</Typography>;
  }

  const { documentTitle, documentContent } = documentInfo;

  // Style component
  const customStyles = {
    container: {
      minWidth: 38,
      display: 'flex',
      justifyContent: 'left',
      padding: '1.25rem'
    },
    upper: {
      fontWeight: 600,
      marginBottom: 1.5
    },
    footer: {
      fontWeight: 500,
      marginBottom: 1.5
    }
  };

  return (
    <div>
      <Box sx={customStyles.container}>
        <Typography variant='h5' sx={customStyles.upper}>Title</Typography>
      </Box>
      <Box sx={customStyles.container}>
        <Typography variant="h6" sx={customStyles.footer}>
          {documentTitle}
        </Typography>
      </Box>
      <Divider flexItem />
      <Box sx={customStyles.container}>
        <Typography variant='h5' sx={customStyles.upper}>Content</Typography>
      </Box>
      <Box sx={customStyles.container}>
        <Typography component="div" dangerouslySetInnerHTML={{ __html: documentContent }} />
      </Box>
    </div>
  );
};

export default DocumentContent;
