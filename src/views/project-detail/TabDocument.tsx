import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil'
import { tokensState } from 'src/recoil/auth/atoms'
import { useRouter } from 'next/router'

// ** MUI Imports

import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

// ** Custom Components Imports
import CardDocument from './CardDocument'

// ** Icons Imports
import Sort from 'mdi-material-ui/Sort'
import Filter from 'mdi-material-ui/Filter'
import Magnify from 'mdi-material-ui/Magnify'

interface Document {
  imageUrl: string;
  creationDate: string;
  documentTitle: string;
  documentId: string;
}

interface TabDocumentProps {
  projectId: string; 
  permissionLevel: string;
}

const TabDocument: React.FC<TabDocumentProps> = ({ projectId, permissionLevel }) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const { accessToken } = useRecoilValue(tokensState)
  
  const headers = { Authorization: `Bearer ${accessToken}` }


  useEffect(() => {
    const fetchDocumentInfo = async () => {
      try {
        const response = await axios.get(`/api/projects/${projectId}/documents`, { headers });
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
  }, [projectId]); 

  const handleSearch = async() => {
    try{
      const response = await axios.get(`/api/projects/${projectId}/documents/search/${keyword}`, { headers });
      if (Array.isArray(response.data.result)) {
        setDocuments(response.data.result as Document[]); 
      } else {
        console.error('Invalid API response:', response.data);
      }
    } catch (error) {
    console.error('Error searching documents:', error);
    }
    
  };


   
  const router = useRouter();

  const [keyword, setKeyword] = useState('');

  const handleCreate = () => {
    router.push({
        pathname: "/create-document",
        query: { projectId: projectId }
    });
  }
    

    
    //style component
    const IconButtonStyle = {
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRadius: 10,
        padding: 8,
        marginRight: 16
      };
    

  return (
    <Grid container justifyContent="flex-start" spacing={2}>
      <Grid item xs={12}>
      <Grid container sx={{ width: '100%',mt:3, justifyContent: 'space-between', alignItems: 'center' }}>
            <div>

                <IconButton style={IconButtonStyle}>
                    <Sort />
                </IconButton>
                <IconButton style={IconButtonStyle}>
                    <Filter />
                </IconButton>
                <TextField
                    size='small'
                    sx={{ '& .MuiOutlinedInput-root': { mr: 4, borderRadius: 4 } }}
                    placeholder='Search'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <Magnify fontSize='small' />
                            </InputAdornment>
                        )
                    }}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <Button
                variant="contained"
                color="primary"
                sx={{
                    mr:4,
                    borderRadius: 1,
                }}
                onClick={handleSearch}
                >
                검색
            </Button>
            </div>
            {permissionLevel === '뷰어' ? null : (
            <Button
                variant="contained"
                color="primary"
                sx={{
                    mr:4,
                    borderRadius: 1,
                }}
                onClick={handleCreate}
            >
                기술문서 생성
            </Button>
            )}
        </Grid>
        <Grid container justifyContent="flex-start" spacing={2}>
          {documents.map((document, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <CardDocument
                imageUrl={document.imageUrl}
                date={document.creationDate}
                title={document.documentTitle}
                documentId={document.documentId}
                projectId={projectId}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}   

export default TabDocument
