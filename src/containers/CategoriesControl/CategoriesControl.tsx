import {Box, Button, Stack, Typography} from "@mui/material";
import ModalFinTrack from "../../components/ModalFinTrack/ModalFinTrack.tsx";
import {useState} from "react";


const CategoriesControl = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleAddClick = () => {

        setIsEdit(false);
        setModalOpen(true);
    };

    return (
        <>
            <Box sx={{ my:4}}>
                <Stack spacing={2} direction="row" justifyContent="space-around" alignItems="center">
                    <Typography variant="h4">Categories</Typography>
                    <Button variant="contained"
                            color="primary"
                            onClick={handleAddClick}
                    >Add</Button>
                </Stack>
                <ModalFinTrack
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    isEdit={isEdit}
                />

            </Box>
        </>
    );
};

export default CategoriesControl;