import {configureStore} from "@reduxjs/toolkit";
import {categoryReducer} from "../../features/categorySlice.ts";
import {transactionsReducer} from "../../features/transactionSlice.ts";

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        transactions: transactionsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;