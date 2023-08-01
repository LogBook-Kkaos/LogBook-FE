import React from "react";
import Button from "@mui/material/Button";

export const MemberRole = {
  Leader: '관리자',
  Editor: '편집자',
  Viewer: '뷰어'
} as const;

export type MemberRole = typeof MemberRole[keyof typeof MemberRole]

interface MemberRoleButtonProps {
  role: MemberRole;
  onClick: () => void;
}

const MemberRoleButton: React.FC<MemberRoleButtonProps> = ({
  role,
  onClick,
}) => {
  return (
    <Button variant="outlined" color="primary" sx={{ mr: 3, ml: 20, width: "85px" }} onClick={onClick}>
      {role}
    </Button>
  );
};

export default MemberRoleButton;