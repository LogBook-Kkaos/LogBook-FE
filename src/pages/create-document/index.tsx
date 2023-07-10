// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormCreateDocument from 'src/views/create-document/FormCreateDocument'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const CreateDocument = () => {
  return (
    <DatePickerWrapper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid container sx={{ maxWidth: '70%' }}>
          <Grid item>
            <FormCreateDocument />
          </Grid>
        </Grid>
      </Box>
    </DatePickerWrapper>
  )
}

export default CreateDocument
