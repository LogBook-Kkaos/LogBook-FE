// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormReleaseNote from 'src/views/create-release-note/FormReleaseNote'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const CreateReleaseNote = () => {
  return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid container sx={{ maxWidth: '75%' }}>
          <Grid item>
            <FormReleaseNote />
          </Grid>
        </Grid>
      </Box>
  )
}

export default CreateReleaseNote;
