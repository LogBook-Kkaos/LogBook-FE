// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormDocument from 'src/views/create-document/FormDocument'

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
        <Grid container sx={{ maxWidth: '75%' }}>
          <Grid item>
            <Card>
              <FormDocument/>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DatePickerWrapper>
  )
}

export default CreateDocument;
