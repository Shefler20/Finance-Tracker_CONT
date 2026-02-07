import {useEffect, useState} from "react";
import {Box, Button, LinearProgress, Stack, Typography} from "@mui/material";
import ModalWrapper from "../../components/ModalWrapper/ModalWrapper.tsx";
import FormFinTrack from "../../components/FormFinTrack/FormFinTrack.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getAllCategories} from "../../features/categorySlice.ts";
import {clearTransaction, deleteTransaction, getAllTransactions, selectAllTransactions, selectEditTransaction, selectTransactionsLoading, setTransaction} from "../../features/transactionSlice.ts";
import dayjs from "dayjs";


const Home = () => {
    const dispatch = useAppDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const transactions = useAppSelector(selectAllTransactions);
    const editTransactionData = useAppSelector(selectEditTransaction);
    const loading = useAppSelector(selectTransactionsLoading);

    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getAllTransactions());
    }, [dispatch]);


    const adClickOpenModal = () => {
        dispatch(clearTransaction());
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
        dispatch(clearTransaction());
    };

    const handleEditClick = (transaction: ITransaction) => {
        dispatch(setTransaction(transaction));
        setModalOpen(true);
    };

    const deleteTransactions = async (id: string) => {
        await dispatch(deleteTransaction(id));
        dispatch(getAllTransactions());
    };

    const sortedTransactions = [...transactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const total = sortedTransactions.reduce((acc, tx) => {
        return tx.type === "income" ? acc + tx.amount : acc - tx.amount;
    }, 0);

    return (
        <>
            <Box sx={{ p: 4 }}>
                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                    <Typography variant="h4">Transactions</Typography>
                    <Typography variant="body1" color="textSecondary">Total: {total}</Typography>
                    <Button variant="contained" onClick={adClickOpenModal}>Add Transaction</Button>
                </Stack>

                {loading && <LinearProgress sx={{ my: 2 }} />}

                {!loading &&(
                    <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
                        {sortedTransactions.map(tx => (
                            <Box
                                key={tx.id}
                                sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}
                            >
                                <Box>
                                    <Typography>Type: {tx.type}</Typography>
                                    <Typography
                                        sx={{ color: tx.type === "income" ? "green" : "red", fontWeight: "bold" }}
                                    >
                                        {tx.type === "income" ? "+" : "-"}{tx.amount}
                                    </Typography>
                                    <Typography>Date: {dayjs(tx.date).format("DD.MM.YYYY HH:mm")}</Typography>
                                </Box>
                                <Stack direction="row" spacing={1}>
                                    <Button variant="outlined" onClick={() => handleEditClick(tx)}>Edit</Button>
                                    <Button variant="outlined" color="error" onClick={() => deleteTransactions(tx.id)}>Delete</Button>
                                </Stack>
                            </Box>
                        ))}
                    </Box>
                )}

                <ModalWrapper open={modalOpen} onClose={handleClose}>
                    <FormFinTrack
                        isEdit={Boolean(editTransactionData)}
                        idTransaction={editTransactionData?.id}
                        initialValues={editTransactionData ?? undefined}
                        onClose={handleClose}
                    />
                </ModalWrapper>
            </Box>
        </>
    );
};

export default Home;