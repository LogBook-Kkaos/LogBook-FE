import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import CardDocument from './CardDocument';

interface Document {
  imageUrl: string;
  date: string;
  title: string;
}

interface TabDocumentProps {
  projectId: string; 
}

const TabDocument: React.FC<TabDocumentProps> = ({ projectId }) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    axios.get(`/api/projects/${projectId}/documents`)
      .then(response => {
        setDocuments(response.data);
      })
      .catch(error => {
        console.error('Error fetching documents:', error);
      });
  }, [projectId]);

  return (
    <Grid container justifyContent="flex-start" spacing={2}>
      {documents.map((document, index) => (
        <CardDocument
          key={index}
          imageUrl={document.imageUrl}
          date={document.date}
          title={document.title}
        />
      ))}
    </Grid>
  );
}

export default TabDocument;
