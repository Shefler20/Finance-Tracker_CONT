import { Box, Select, MenuItem, TextField, Button, Typography, CircularProgress } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import { selectAllCategories } from "../../features/categorySlice.ts";
import {useEffect} from "react";
import {addTransaction, editTransaction, getAllTransactions} from "../../features/transactionSlice.ts";

interface Props {
    isLoading?: boolean;
    onClose?: () => void;
    initialValues?: ITransactionForm;
    isEdit?: boolean;
    idTransaction?: string;
}

const FormFinTrack: React.FC<Props> = ({ isLoading = false, onClose, initialValues, isEdit=false,idTransaction }) => {
    const categories = useAppSelector(selectAllCategories);
    const dispatch = useAppDispatch();

    const { handleSubmit, control, watch, formState: { errors }, reset } = useForm<ITransactionForm>({
        defaultValues: { type: "income", categoryId: "", amount: 0 }
    });

    useEffect(() => {
        if (initialValues) {
            reset(initialValues)
        }else {
            reset();
        }
    },[initialValues,reset])

    const selectedType = watch("type");

    const filteredCategories = categories.filter(cat => cat.type === selectedType);

    const submitHandler = async (data: ITransactionForm) => {
        const newData: ISendFormApi = {
            categoryId: data.categoryId,
            amount: data.amount,
            date: new Date().toISOString(),
        };
        if (!isEdit || !idTransaction) {
            await dispatch(addTransaction(newData));
            dispatch(getAllTransactions());
        }else {
            await dispatch(editTransaction({ id: idTransaction, data: newData }));
            dispatch(getAllTransactions());
        }
        console.log(newData)
        reset();
        onClose?.();
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(submitHandler)}
            sx={{ maxWidth: 400, mx: "auto", display: "flex", flexDirection: "column", gap: 2, p: 2 }}
        >
            <Typography variant="h6" sx={{ textAlign: "center" }}>
                {isEdit ? "Edit" : "Add"}
            </Typography>

            <Controller
                name="type"
                control={control}
                rules={{ required: "Select type" }}
                render={({ field }) => (
                    <Select {...field} fullWidth>
                        <MenuItem value="income">Income</MenuItem>
                        <MenuItem value="expense">Expense</MenuItem>
                    </Select>
                )}
            />
            {errors.type && <Typography color="error" variant="caption">{errors.type.message}</Typography>}

            <Controller
                name="categoryId"
                control={control}
                rules={{ required: "Select category" }}
                render={({ field }) => (
                    <Select {...field} fullWidth>
                        {filteredCategories.map(cat => (
                            <MenuItem key={cat.id} value={cat.id}>{cat.categoryName}</MenuItem>
                        ))}
                    </Select>
                )}
            />
            {errors.categoryId && <Typography color="error" variant="caption">{errors.categoryId.message}</Typography>}

            <Controller
                name="amount"
                control={control}
                rules={{ required: "Enter amount", min: { value: 1, message: "Amount must be positive" } }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Amount"
                        type="number"
                        fullWidth
                        error={Boolean(errors.amount)}
                        helperText={errors.amount?.message}
                    />
                )}
            />

            <Button type="submit" variant="contained" size="large">
                {isLoading ? <CircularProgress size={24} /> : "Save"}
            </Button>
        </Box>
    );
};

export default FormFinTrack;


