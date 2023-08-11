import React, { useState } from 'react';
import Select from 'react-select';

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import PlusThick from 'mdi-material-ui/PlusThick'
import Cog from 'mdi-material-ui/CogOutline'

import { useRecoilState } from 'recoil';
import { activeView } from 'src/recoil/issue/atom';

interface DataType {
  title: string
  name: string
}

interface IssueTagProps {
  onIssueCreate: any,
  issueData: any
}

const IssueTag = ({ onIssueCreate, issueData }: IssueTagProps) => {
  const [activeTab, setActiveTab] = useRecoilState(activeView);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectVisible, setSelectVisible] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
  };

  const handleAvatarClick = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
      setSelectVisible(false);
    } else {
      setExpandedIndex(index);
      setSelectVisible(true);
    }
  };

  const handleSelectChange = (selectedOption: any) => {
    setSelectedValue(selectedOption.value);
    console.log(selectedOption.value)
  };

  const options = [
    { value: '이서빈', label: '이서빈' },
    { value: '이소현', label: '이소현' },
    { value: '윤주은', label: '윤주은' }, 
    { value: '장예경', label: '장예경' },
  ];

  return (<>
    <Card sx={{ p: 3, m: 2, backgroundColor: "#e0f2ff" }}>
      <CardHeader
        title='할 일'
        sx={{ pt: 2.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
        titleTypographyProps={{
          variant: 'h6',
          sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
        }}
      />
      {issueData.map((item: DataType, index: number) => {
        return (
          <Card key={index}
            sx={{ position: 'relative', mb: 2 }}
            onClick={() => handleTabChange('issueDetail')}>
            <CardContent>
              <Box
                sx={{
                  mt: 2,
                  mb: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography >{item.title}</Typography>
                </Box>
                <IconButton style={{ borderRadius: 10, padding: 8 }}>
                  <Cog />
                </IconButton>
              </Box>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  position: 'relative'
                }}
              >
                <Avatar
                  src='/images/avatars/8.png'
                  alt={selectedValue || '없음'}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleAvatarClick(index);
                  }}
                  sx={{ cursor: 'pointer' }}
                />
              </Box>
            </CardContent>
          </Card>)
      })}
      <Box sx={{ display: 'flex', flexDirection: 'row' }}
        onClick={() => handleTabChange('createIssue')}>
        <IconButton style={{ borderRadius: 10 }}>
          <PlusThick />
        </IconButton>
        <Box sx={{ paddingTop: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography >이슈 추가</Typography>
        </Box>
      </Box>
    </Card>
    {expandedIndex !== null &&
      selectVisible && (
        <Box
          sx={{
            position: 'relative',
            top: 'calc(-25% + 0px)',
            left: '140px',
            width: "150px",
            mt: 1,
            py: 1,
            backgroundColor: '#fff',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            zIndex: 5000
          }}
        >
          <Select options={options}
            menuIsOpen
            onMenuClose={() => setSelectVisible(false)}
            onChange={handleSelectChange}
          />
        </Box>
      )}
  </>
  )
}

export default IssueTag
