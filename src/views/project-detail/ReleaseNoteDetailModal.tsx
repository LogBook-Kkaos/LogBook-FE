import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { ReleaseNote } from "src/views/project-detail/TabReleaseNote";
import CategoryTag from "src/views/project-detail/CategoryTag";

interface ReleaseNoteDetailModalProps {
  releaseNote: ReleaseNote | null;
  onClose: () => void;
}

const ReleaseNoteDetailModal: React.FC<ReleaseNoteDetailModalProps> = ({ releaseNote, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      open={!!releaseNote}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{backgroundColor: 'white', width: '800px', height: '500px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '30px'}}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight: 'bold'}}>
          {releaseNote?.releaseTitle}
        </Typography>
        <Typography id="modal-modal-description" variant="body2" sx={{marginTop: '20px'}}>
            <strong>Version: </strong>{releaseNote?.version}
        </Typography>
        <Typography id="modal-modal-description" variant="body2" sx={{marginTop: '20px'}}>
            <strong>Creator: </strong>{releaseNote?.creator.userName}
        </Typography>
        <Typography id="modal-modal-description" variant="body2" sx={{marginTop: '20px'}}>
            <strong>Creation Date: </strong>{releaseNote?.creationDate ? new Date(releaseNote?.creationDate).toLocaleDateString(): ""}
        </Typography>
        <Typography id="modal-modal-description" variant="body2" sx={{marginTop: '20px'}}>
          {releaseNote?.releaseContents.map((item, index) => (
            <Box key={index} sx={{marginBottom: '10px'}}>
               <CategoryTag category={item.category} />
              <Typography>{item.releaseSummary}</Typography>
              {item.documentLink && <Typography component='a' href={item.documentLink} target='_blank' sx={{fontSize: '14px'}}>{item.documentLink}</Typography>}
            </Box>
          ))}
        </Typography>
      </Box>
    </Modal>
  );
}

export default ReleaseNoteDetailModal;
