import React, { useState } from 'react';

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'

// ** Custom Components Imports
import CardIssue from './CardIssue'

const CardWrapper = styled(Box)<BoxProps>({
    width: '33%',
    height: 500
})

const TabIssue = () => {
    const [flag, setFlag] = useState(false)

    const handleChangeFlag = () => {
        setFlag(!flag)
    }

    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12}>
                <Card sx={{ maxHeight: 'calc(100vh - 350px)', display: 'flex', flexDirection: 'column', overflow: 'auto', }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', gap: '0rem', alignItems: 'stretch' }}>
                        <CardWrapper>
                            <CardIssue cardTitle='할일' onChange={handleChangeFlag} flag={flag}/>
                        </CardWrapper>
                        <CardWrapper>
                            <CardIssue cardTitle='진행중' onChange={handleChangeFlag} flag={flag}/>
                        </CardWrapper>
                        <CardWrapper>
                            <CardIssue cardTitle='완료' onChange={handleChangeFlag} flag={flag}/>
                        </CardWrapper>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default TabIssue
