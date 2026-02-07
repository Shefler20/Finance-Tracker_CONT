import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;   
    children: React.ReactNode;
    showActions?: boolean;
}

const ModalWrapper: React.FC<ModalProps> = ({ open, onClose, title, children, showActions = true }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent dividers>
                {children}
            </DialogContent>
            {showActions && (
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                </DialogActions>
            )}
        </Dialog>
    );
};

export default ModalWrapper;