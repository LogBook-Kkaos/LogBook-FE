import React from 'react';
import { useRouter } from 'next/router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface CardDocumentProps {
    imageUrl: string;
    date: string;
    title: string;
    documentId: string;
    projectId: string;
  }

const CardDocument: React.FC<CardDocumentProps> = ({ imageUrl, date, title, documentId, projectId }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push({
      pathname: "/document-detail",
      query: { documentId: documentId, projectId: projectId}
  });
  };

  const defaultImageUrl = '/images/LogBook_Logo_vertical.svg';

  return (
    <Card sx={{ m: 5, width: 250, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }} onClick={handleCardClick} >
      <CardMedia
        component="img"
        height="140"
        src={imageUrl || defaultImageUrl}
        alt="Document Image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          작성일: {date}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardDocument;