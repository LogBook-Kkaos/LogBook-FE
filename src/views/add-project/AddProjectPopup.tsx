import React, { useState } from 'react';

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

interface AddProjectPopupProps {
   isOpen: boolean
   onClose: () => void
}

const AddProjectPopup = (props: AddProjectPopupProps) => {
  const { isOpen, onClose } = props
  
  const [projectName, setProjectName] = useState('')

  const handleProjectNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value)
  };
  
  const handleClickAddButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Adding project:', projectName);
    onClose();
  }

  return (
    <Dialog open={isOpen} onClose={onClose} >
      <DialogTitle>
        <Typography>Project Add</Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Project Name"
          value={projectName}
          onChange={handleProjectNameChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClickAddButton}>Add Project</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddProjectPopup