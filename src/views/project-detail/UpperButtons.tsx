// ** React Imports
import { SyntheticEvent, useState } from 'react'

import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'


// ** Icons Imports
import Sort from 'mdi-material-ui/Sort'
import Filter from 'mdi-material-ui/Filter'
import Magnify from 'mdi-material-ui/Magnify'

interface UpperButtonsProps {
    routerPath: string,
    createButtonLabel: string,
    projectId: string,
    permissionLevel: string
}

const UpperButtons : React.FC<UpperButtonsProps> = ({ routerPath, createButtonLabel, projectId, permissionLevel }) =>{
    const router = useRouter();

    const handleCreate = () => {
        router.push({
            pathname: routerPath,
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
    

    return(
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
                />
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
                {createButtonLabel}
            </Button>
            )}
        </Grid>
    )
}
export default UpperButtons;