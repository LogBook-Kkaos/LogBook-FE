import React from 'react';

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

// ** Custom Components Imports
import IssueTag from './IssueTag';

const CardWrapper = styled(Box)<BoxProps>({
    width: '33%',
    height: 500
})
interface IssueTagProps {
    onIssueCreate: any,
    issueData: any
}

const TabIssue = ({ onIssueCreate, issueData }: IssueTagProps) => {
    const handleIssueCreate = (issueTitle: string) => {
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
