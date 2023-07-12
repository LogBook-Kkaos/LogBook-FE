import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import FormHeader from './FormHeader';
import FormContent from './FormContent';

import {handleSave, handleDelete} from 'src/views/create-release-note/FormReleaseNoteActions';

const FormReleaseNote = () => {
  const handleSubmit = () => {
    
  };

  const handleRemove = () => {
    
  };

  return (
    <Card>
      <FormHeader onSubmit={handleSubmit} onDelete={handleRemove} />
      <Divider sx={{ margin: 0 }} />
      <FormContent />
    </Card>
  );
};

export default FormReleaseNote;
