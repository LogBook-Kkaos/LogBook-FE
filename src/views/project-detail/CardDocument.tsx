import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface CardDocumentProps {
    imageUrl: string;
    date: string;
    title: string;
  }

const CardDocument: React.FC<CardDocumentProps> = ({ imageUrl, date, title }) => {
  return (
    <Card sx={{ m: 5, width: 250 }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
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