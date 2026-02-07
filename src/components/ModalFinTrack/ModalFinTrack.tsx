import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import FormMutation from "../FormMutation/FormMutation.tsx";



interface Props {
    open: boolean;
    onClose: () => void;
    isEdit?: boolean;
    initialValue?: IFormCategories ;
    isLoading?: boolean;
    idCategory?: string;
}

const ModalFinTrack: React.FC<Props> = ({ open, onClose, isEdit = false, initialValue, isLoading=false, idCategory }) => {
    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>{isEdit ? "Edit Category" : "Add Category"}</DialogTitle>
                <DialogContent dividers>
                    <FormMutation
                        isEdit={isEdit}
                        initialValue={initialValue}
                        isLoading={isLoading}
                        idCategory={idCategory}
                        onClose={onClose}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ModalFinTrack;