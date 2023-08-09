import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PlusThick from 'mdi-material-ui/PlusThick';
import TextField from '@mui/material/TextField';

// ** Custom Components Imports
import StatusTag, { Status } from './StatusTag';

interface DataType {
  title: string;
  name: string;
}

const SubIssueTag = () => {
  const [subIssues, setSubIssues] = useState<DataType[]>([]);
  const [isAddingSubIssue, setIsAddingSubIssue] = useState(false);
  const [newSubIssueTitle, setNewSubIssueTitle] = useState('');

  const handleAddSubIssue = () => {
    setIsAddingSubIssue(true);
  };

  const handleSaveSubIssue = () => {
    if (newSubIssueTitle) {
      const newSubIssue: DataType = {
        title: newSubIssueTitle,
        name: '이서빈',
      };
      setSubIssues([...subIssues, newSubIssue]);
      setNewSubIssueTitle('');
      setIsAddingSubIssue(false);
    }
  };

  return (
    <Card sx={{ p: 3, m: 2, backgroundColor: '#e0f2ff' }}>
      {subIssues.map((item: DataType, index: number) => (
        <Card
          key={index}
          sx={{ position: 'relative', mb: 2, alignItems: 'center' }}
        >
          <CardContent
            sx={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                gap: 2,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  mr: 2,
                  mb: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography>{item.title}</Typography>
              </Box>
              <Box sx={{ gap: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Avatar src='/images/avatars/8.png' alt='Alice Cobb' />
                <IconButton style={{ borderRadius: 10, padding: 8 }}>
                  <StatusTag status={Status.InProgress} />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
      {isAddingSubIssue ? (
        <Card sx={{ position: 'relative', mb: 2, alignItems: 'center' }}>
          <CardContent
            sx={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  mr: 2,
                  mb: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <TextField
                  sx={{ width: '400%', maxWidth: 1100 }}
                  id="sub_issue_title"
                  label="하위 이슈 제목"
                  variant="standard"
                  fullWidth
                  value={newSubIssueTitle}
                  onChange={(e) => setNewSubIssueTitle(e.target.value)}
                  InputProps={{
                    inputProps: { 'aria-label': '하위 이슈 제목 입력창' },
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Button
                  variant="contained"
                  sx={{ fontSize: '0.6rem', mr: 4 }}
                  onClick={handleSaveSubIssue}
                >
                  추가
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}
          onClick={handleAddSubIssue}>
          <IconButton
            style={{ borderRadius: 10 }}
          >
            <PlusThick />
          </IconButton>
          <Box sx={{ paddingTop: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography>하위 이슈 추가</Typography>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default SubIssueTag;
