// components/DocumentContent.js
import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from '@mui/material/styles';
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
  const title = "안녕하세요"; 
  const content = "<p><strong>문서 내용</strong>을 채워주세요!</p>"; 

//style component
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
          {title}
        </Typography>
      </Box>
      <Divider flexItem />
      <Box sx={customStyles.container}>
        <Typography variant='h5' sx={customStyles.upper}>Content</Typography>
      </Box>
      <Box sx={customStyles.container}>
      <Typography component="div" dangerouslySetInnerHTML={{ __html: content }} />
      </Box>
    </div>
  );
};

export default DocumentContent;
