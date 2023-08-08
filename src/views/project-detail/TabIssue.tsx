// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box, { BoxProps } from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

// ** Custom Components Imports
import CategoryTag, { Category } from 'src/views/project-detail/CategoryTag'
import IssueTag from './IssueTag';

interface DataType {
    id: number;
    title: string;
}

const projectData: DataType = {
    id: 1,
    title: "할 일",
};

const CardWrapper = styled(Box)<BoxProps>({
    width: '33%',
    height: 500
})

const TabIssue = () => {

    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12}>
                <Card sx={{ maxHeight: 'calc(100vh - 350px)', display: 'flex', flexDirection: 'column', overflow: 'auto', }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', gap: '0rem', alignItems: 'stretch' }}>
                        <CardWrapper>
                            <IssueTag />
                        </CardWrapper>
                        <CardWrapper>
                            <IssueTag />
                        </CardWrapper>
                        <CardWrapper>
                            <IssueTag />
                        </CardWrapper>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default TabIssue
