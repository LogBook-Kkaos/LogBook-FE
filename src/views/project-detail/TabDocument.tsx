import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil'
import { tokensState } from 'src/recoil/auth/atoms'

// ** MUI Imports

import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import CardDocument from './CardDocument'
import UpperButtons from './UpperButtons'

interface Document {
  imageUrl: string;
  creationDate: string;
  documentTitle: string;
  documentId: string;
}

interface TabDocumentProps {
  projectId: string; 
}

const TabDocument: React.FC<TabDocumentProps> = ({ projectId }) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const { accessToken } = useRecoilValue(tokensState)
  
  const headers = { Authorization: `Bearer ${accessToken}` }


  useEffect(() => {
    const fetchDocumentInfo = async () => {
      try {
        const response = await axios.get(`/api/projects/${projectId}/documents`, { headers });
        console.log(response.data.result);
        if (Array.isArray(response.data.result)) {
          setDocuments(response.data.result as Document[]); 
        } else {
          console.error('Invalid API response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
      } 
    }
    fetchDocumentInfo();
  }, [projectId, headers]); 
  
  console.log(documents); 


  return (
    <Grid container justifyContent="flex-start" spacing={2}>
      <UpperButtons createButtonLabel="기술문서 생성" routerPath="/create-document" projectId={projectId}/>

      {documents.map((document, index) => (
        <CardDocument
          key={index}
          imageUrl={document.imageUrl}
          date={document.creationDate}
          title={document.documentTitle}
          documentId={document.documentId}
          projectId={projectId}
        />
      ))}
    </Grid>
  );
}   

export default TabDocument
