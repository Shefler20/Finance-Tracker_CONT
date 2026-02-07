import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import ModalWrapper from "../../components/ModalWrapper/ModalWrapper.tsx";
import FormFinTrack from "../../components/FormFinTrack/FormFinTrack.tsx";
import {useAppDispatch} from "../../app/hooks.ts";
import {getAllCategories} from "../../features/categorySlice.ts";



const Home = () => {
    const dispatch = useAppDispatch();
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    const adClickOpenModal = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };
    return (
        <>
            <Button onClick={adClickOpenModal}>on</Button>
            <Button onClick={handleClose}>X</Button>
            <ModalWrapper
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <FormFinTrack
                    onClose={() => setModalOpen(false)}
                />
            </ModalWrapper>
        </>
    );
};

export default Home;