// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiDivider, { DividerProps } from '@mui/material/Divider'
import CardMedia from '@mui/material/CardMedia'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import AvatarGroup from '@mui/material/AvatarGroup'
import IconButton from '@mui/material/IconButton'
import PlusThick from 'mdi-material-ui/PlusThick'
import Cog from 'mdi-material-ui/CogOutline'
import { blue } from '@mui/material/colors'
import StatusTag, { Status } from "./StatusTag"
import TextField from '@mui/material/TextField';

interface DataType {
    title: string
    name: string
}

const Divider = styled(MuiDivider)<DividerProps>(({ theme }) => ({
    margin: theme.spacing(5, 0),
    borderRight: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('md')]: {
        borderRight: 'none',
        margin: theme.spacing(0, 5),
        borderBottom: `1px solid ${theme.palette.divider}`
    }
}))

const CreateIssueTag = () => {
    return (
        <Card sx={{ p: 1, m: 2, backgroundColor: "#e0f2ff" }}>
            <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'left', p: '1.25rem' }}>
                <TextField
                    sx={{ backgroundColor: 'white' }}
                    id="document_title"
                    label="기능 내용 설명"
                    multiline  
                    rows={8}   
                    // value={title}
                    // onChange={handleTitleChange}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        inputProps: { 'aria-label': '제목 입력창' }
                    }}
                />
            </Box>
        </Card>
    )
}

export default CreateIssueTag
