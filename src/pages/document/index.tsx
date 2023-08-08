// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import DocumentContent from 'src/views/document/DocumentContent';

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'


const Document = () => {
  return (
    <DatePickerWrapper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card>
          <DocumentContent/>
        </Card>
      </Box>
    </DatePickerWrapper>
  )
}

export default Document;
