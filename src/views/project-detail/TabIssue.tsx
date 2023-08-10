// ** MUI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box, { BoxProps } from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import React, { useState } from 'react';

// ** Custom Components Imports
import IssueTag from './IssueTag';

const CardWrapper = styled(Box)<BoxProps>({
    width: '33%',
    height: 500
})

const TabIssue = ({ onIssueCreate, issueData }) => {
    const [activeIssueTab, setActiveIssueTab] = useState(''); // Set your initial state here if needed
  
    const handleIssueCreate = (issueTitle) => {
      onIssueCreate(issueTitle);
    };

    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12}>
                <Card sx={{ maxHeight: 'calc(100vh - 350px)', display: 'flex', flexDirection: 'column', overflow: 'auto', }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', gap: '0rem', alignItems: 'stretch' }}>
                        <CardWrapper>
                            <IssueTag onIssueCreate={handleIssueCreate} issueData={issueData} />
                        </CardWrapper>
                        <CardWrapper>
                        <IssueTag onIssueCreate={handleIssueCreate} issueData={issueData} />
                        </CardWrapper>
                        <CardWrapper>
                        <IssueTag onIssueCreate={handleIssueCreate} issueData={issueData} />
                        </CardWrapper>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default TabIssue
