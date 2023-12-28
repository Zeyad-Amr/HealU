// Modal.tsx
import React, { FC, ReactNode } from "react";
import "./Popup.css";
import { on } from "events";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

const PopUp: FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <div className="modal-header">
            <h2 className="modal-title">{title}</h2>
          </div>
          <IconButton aria-label="delete" size="large" onClick={onClose}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </div>

        {children}
      </div>
    </div>
  );
};

export default PopUp;
