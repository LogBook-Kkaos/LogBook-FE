// StatusTag.tsx
import React from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography'

export const Status = {
  NotStarted: '할일',
  InProgress: '진행중',
  Completed: '완료'
} as const;
export type Status = typeof Status[keyof typeof Status]

const statusColors = {
  [Status.NotStarted]: '#CECECE',
  [Status.InProgress]: '#BBFFF3',
  [Status.Completed]: '#C7E3FE',
}

const statusTextColors = {
  [Status.NotStarted]: '#797979',
  [Status.InProgress]: '#05D7B1',
  [Status.Completed]: '#41A3FF',
}

interface StatusTagProps {
  status: Status;
}

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  return (
    <Box
      sx={{
        borderRadius: 1,
        paddingTop: 0.1,
        paddingBottom: 0.1,
        paddingLeft: 1,
        paddingRight: 1,
        background: statusColors[status],
        display: "inline-block",
      }}
    >
      <Typography
        variant="caption"
        component="span"
        sx={{ color: statusTextColors[status] }}
      >
        <b>{status}</b>
      </Typography>
    </Box>
  );
};

export default StatusTag;
