// ** React Imports
import { SyntheticEvent, useState } from 'react'

import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import Cog from 'mdi-material-ui/cog'
import Sort from 'mdi-material-ui/sort'
import Filter from 'mdi-material-ui/filter'
import Magnify from 'mdi-material-ui/Magnify'
import LightbulbOnOutline from 'mdi-material-ui/LightbulbOnOutline'
import NoteAlertOutline from 'mdi-material-ui/NoteAlertOutline'
import FileRefreshOutline from 'mdi-material-ui/FileRefreshOutline'


const UpperButtons =({ routerPath, createButtonLabel }: { routerPath: string, createButtonLabel: string })  =>{
    const router = useRouter();

    const handleCreate = () => {
          router.push(routerPath)
      }

    
    //style component
    const IconButtonStyle = {
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRadius: 10,
        padding: 8,
        marginRight: 16
      };
    

    return(
        <Grid container sx={{ width: '100%',mt:3, justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <IconButton style={IconButtonStyle}>
                    <Cog />
                </IconButton>
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
                />
            </div>

            <Button
                variant="contained"
                color="primary"
                sx={{
                    mr:4,
                    borderRadius: 1,
                }}
                onClick={handleCreate}
            >
                {createButtonLabel}
            </Button>
        </Grid>
    )
}
export default UpperButtons;