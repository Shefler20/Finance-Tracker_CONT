import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import axiosAPI from "../axiosAPI.ts";
import type {RootState} from "../app/store/store.ts";

interface TransactionsState {
    transactions: ITransaction[];
    transaction: ITransaction | null;
    loading: boolean;
}

const initialState: TransactionsState = {
    transactions: [],
    transaction: null,
    loading: false,
};

export const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        setTransaction(state, action: PayloadAction<ITransaction>) {
            state.transaction = action.payload;
        },

        clearTransaction(state) {
            state.transaction = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllTransactions.pending, (state) => { state.loading = true; })
        builder.addCase(getAllTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
        builder.addCase(getAllTransactions.rejected, (state) => { state.loading = false; })

        builder.addCase(addTransaction.pending, (state) => { state.loading = true; })
        builder.addCase(addTransaction.fulfilled, (state) => { state.loading = false; })
        builder.addCase(addTransaction.rejected, (state) => { state.loading = false; })

        builder.addCase(editTransaction.pending, (state) => { state.loading = true; })
        builder.addCase(editTransaction.fulfilled, (state) => { state.loading = false; })
        builder.addCase(editTransaction.rejected, (state) => { state.loading = false; })

        builder.addCase(deleteTransaction.pending, (state) => { state.loading = true; })
        builder.addCase(deleteTransaction.fulfilled, (state) => { state.loading = false; })
        builder.addCase(deleteTransaction.rejected, (state) => { state.loading = false; });
    },
});

export const getAllTransactions = createAsyncThunk<ITransaction[], void>(
    "transactions/getAllTransactions",
    async (_, { getState }) => {
        const state = getState() as RootState;
        const categories = state.category.categories;

        const resp = await axiosAPI<ITransactionAPI>("/transactions.json");
        const data = resp.data;
        if (!data) return [];

        return Object.keys(data).map(id => ({
            id,
            ...data[id],
            type: categories.find(c => c.id === data[id].categoryId)?.type ?? "income",
            amount: Number(data[id].amount),
        }));
    }
);

export const addTransaction = createAsyncThunk<void, ISendFormApi>(
    "transactions/addTransaction",
    async (data) => {
        await axiosAPI.post("/transactions.json", data);
    }
);

export const editTransaction = createAsyncThunk<void, { id: string; data: ISendFormApi }>(
    "transactions/editTransaction",
    async ({ id, data }) => {
        await axiosAPI.put(`/transactions/${id}.json`, data);
    }
);

export const deleteTransaction = createAsyncThunk<void, string>(
    "transactions/deleteTransaction",
    async (id) => {
        await axiosAPI.delete(`/transactions/${id}.json`);
    }
);

export const selectAllTransactions = (state: { transactions: TransactionsState }) => state.transactions.transactions;
export const selectTransactionsLoading = (state: { transactions: TransactionsState }) => state.transactions.loading;
export const selectEditTransaction = (state: RootState) => state.transactions.transaction;

export const transactionsReducer = transactionsSlice.reducer;
export const {setTransaction, clearTransaction} = transactionsSlice.actions;