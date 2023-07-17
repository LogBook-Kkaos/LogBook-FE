
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

// ** Icons Imports
import Cog from 'mdi-material-ui/cog'
import Sort from 'mdi-material-ui/sort'
import Filter from 'mdi-material-ui/filter'
import Magnify from 'mdi-material-ui/Magnify'

// ** Components Imports
import ProjectTable from 'src/views/project-detail/ProjectTable'


const ProjectDetail = () => {
  const router = useRouter();

  const handleCreateReleaseNote = () => {
    console.log('create release note')
    router.push('/create-release-note')
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          Project 1
        </Typography>
        <Typography variant='body2'>This is the project description.</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid>
            <Button variant="contained" color="primary" style={{ marginRight: 16, borderRadius: 10 }} onClick={handleCreateReleaseNote}>
              릴리즈 노트 작성하기
            </Button>
            <IconButton style={{ border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: 10, padding: 8 }}>
              <Cog />
            </IconButton>
          </Grid>
          <Grid>
            <IconButton style={{ border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: 10, padding: 8, marginRight: 16 }}>
              <Sort />
            </IconButton>
            <IconButton style={{ border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: 10, padding: 8, marginRight: 16 }}>
              <Filter />
            </IconButton>
            <TextField
              size='small'
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
              placeholder='Search'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Magnify fontSize='small' />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <ProjectTable />
        </Card>
      </Grid>
    </Grid>
  )
}

export default ProjectDetail