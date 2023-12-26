// Modal.tsx
import React, { FC, ReactNode } from "react";
import "./Popup.css";
import { on } from "events";
import { Button } from "@mui/material";

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
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PopUp;
