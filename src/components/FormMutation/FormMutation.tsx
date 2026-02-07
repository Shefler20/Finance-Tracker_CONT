
import {Box, Select, MenuItem, TextField, Button, Typography, CircularProgress} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {useEffect} from "react";

interface Props {
    isEdit?: boolean,
    initialValue?: IFormCategories
    idCategory?: string
    isLoading: boolean
    onClose?: () => void;
}

const FormMutation: React.FC<Props> = ({isEdit=false, initialValue, idCategory, isLoading=false, onClose}) => {
    const {handleSubmit, control, reset, formState: { errors }} = useForm<IFormCategories>({
        defaultValues: {
            type: "",
            categoryName: ""
        }
    });

    useEffect(() => {
        if (initialValue) {
            reset(initialValue)
        }
    }, [initialValue,reset]);

    const onSubmit = (data:IFormCategories) => {
        if (!isEdit || !idCategory) {
            //post
        }else {
            //put
        }
        console.log(data);
        onClose?.();
        reset();
    };
    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    maxWidth: 420,
                    mx: "auto",
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    bgcolor: "background.paper"
                }}
            >

                <Controller
                    name="type"
                    control={control}
                    rules={{ required: "Choose type" }}
                    render={({ field }) => (
                        <>
                            <Select {...field} fullWidth >
                                <MenuItem value="income">Income</MenuItem>
                                <MenuItem value="expense">Expense</MenuItem>
                            </Select>

                                    {errors.type && (
                                        <Typography color="error" variant="caption">
                                            {errors.type.message}
                                        </Typography>
                                    )}
                        </>
                    )}
                />

                <Controller
                    name="categoryName"
                    control={control}
                    rules={{ required: "Name of Categories" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Name Category"
                            fullWidth
                            error={Boolean(errors.categoryName)}
                            helperText={errors.categoryName?.message}
                        />
                    )}
                />

                <Button type="submit" variant="contained" size="large">
                    {isLoading ? <CircularProgress/> : 'Save'}
                </Button>
            </Box>
        </>
    );
};

export default FormMutation;