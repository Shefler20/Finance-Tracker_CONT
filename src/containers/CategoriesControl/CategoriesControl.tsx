import {Box, Button, LinearProgress, Stack, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {clearCategory, deleteCategory, getAllCategories, selectAllCategories, selectLoadingGet, selectLoadingPut, selectLoadingSend, selectOneCategory, setCategory} from "../../features/categorySlice.ts";
import CardCategory from "../../components/CardCategory/CardCategory.tsx";
import ModalWrapper from "../../components/ModalWrapper/ModalWrapper.tsx";
import FormMutation from "../../components/FormMutation/FormMutation.tsx";



const CategoriesControl = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectAllCategories);
    const oneCategory = useAppSelector(selectOneCategory);

    const loading = useAppSelector(selectLoadingGet);
    const loadingSend = useAppSelector(selectLoadingSend);
    const loadingPut = useAppSelector(selectLoadingPut);

    const handleAddClick = () => {
        dispatch(clearCategory());
        setIsEdit(false);
        setModalOpen(true);
    };

    const editCategory = (category: ICategory) => {
        dispatch(setCategory(category));
        setIsEdit(true);
        setModalOpen(true);
    };

    const deleteOneCategory = async (id: string) => {
        await dispatch(deleteCategory(id));
        dispatch(getAllCategories());
    };

    const handleClose = () => {
        setModalOpen (false);
        dispatch(clearCategory());
    };

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    return (
        <>
            {loading && <LinearProgress/>}
            <Box sx={{ my:4}}>
                <Stack spacing={2} direction="row" justifyContent="space-around" alignItems="center">
                    <Typography variant="h4">Categories</Typography>
                    <Button variant="contained"
                            color="primary"
                            onClick={handleAddClick}
                    >Add</Button>
                </Stack>

                {!loading  && (
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 6, mt:3, flexWrap: "wrap"}}>
                        {categories.map(cat =>  (
                            <CardCategory key={cat.id} category={cat} onEdit={editCategory} onDelete={deleteOneCategory} />
                        ))}
                    </Box>
                )}

                <ModalWrapper open={modalOpen}
                              onClose={handleClose}>
                    <FormMutation
                        isEdit={isEdit}
                        initialValue={oneCategory ?? undefined}
                        idCategory={oneCategory?.id}
                        isLoading={loadingPut || loadingSend}
                        onClose={handleClose}
                    />
                </ModalWrapper>

            </Box>
        </>
    );
};

export default CategoriesControl;