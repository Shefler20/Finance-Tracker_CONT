import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosAPI from "../axiosAPI.ts";
import type {RootState} from "../app/store/store.ts";

interface CategoryState {
    categories: ICategory[];
    oneCategory: ICategory | null
    loading: {
        send: boolean;
        put: boolean;
        get: boolean;
        delete: boolean;
    };
}

export const initialState: CategoryState = {
    categories: [],
    oneCategory: null,
    loading: {
        send: false,
        put: false,
        get: false,
        delete: false,
    }
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers:{
        setCategory(state, action: { payload: ICategory | null }) {
            state.oneCategory = action.payload;
        },
        clearCategory(state) {
            state.oneCategory = null;
        },
    },
    extraReducers: builder => {
        builder.addCase(getAllCategories.pending, (state) => {
            state.loading.get = true
        })
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.loading.get = false

            state.categories = action.payload;
        })
        builder.addCase(getAllCategories.rejected, (state) => {
            state.loading.get = false
        })

        builder.addCase(addCategory.pending, (state) => {
            state.loading.send = true
        })
        builder.addCase(addCategory.fulfilled, (state) => {
            state.loading.send = false
        })
        builder.addCase(addCategory.rejected, (state) => {
            state.loading.send = false
        })

        builder.addCase(editCategory.pending, (state) => {
            state.loading.put = true
        })
        builder.addCase(editCategory.fulfilled, (state) => {
            state.loading.put = false
        })
        builder.addCase(editCategory.rejected, (state) => {
            state.loading.put = false
        })

        builder.addCase(deleteCategory.pending, (state) => {
            state.loading.delete = true
        })
        builder.addCase(deleteCategory.fulfilled, (state) => {
            state.loading.delete = false
        })
        builder.addCase(deleteCategory.rejected, (state) => {
            state.loading.delete = false
        })
    }
});

export const selectAllCategories = (state: RootState) => state.category.categories;
    export const selectOneCategory = (state: RootState) => state.category.oneCategory;

export const selectLoadingGet = (state: RootState) => state.category.loading.get;
export const selectLoadingSend = (state: RootState) => state.category.loading.send;
export const selectLoadingPut = (state: RootState) => state.category.loading.put;

export const getAllCategories = createAsyncThunk<ICategory[], void>('category/getAllCategories',
    async () => {
    const resp = await axiosAPI<ICategoriesAPI>('/category.json');
    const dataObject = resp.data;

    if (!dataObject) return[];
    return Object.keys(dataObject).map(id => ({
        ...dataObject[id],
        id
    }));
    });

export const addCategory = createAsyncThunk<void, IFormCategories>('category/addCategory',
    async (formData) => {
    await axiosAPI.post('/category.json', formData);
    });

export const editCategory = createAsyncThunk<void, EditCategory>('category/editCategory',
    async ({id, data})=> {
    await axiosAPI.put(`/category/${id}.json`, data);
    });

export const deleteCategory = createAsyncThunk<void, string>('category/deleteCategory',
    async (id) => {
    await axiosAPI.delete(`/category/${id}.json`);
    });

export const categoryReducer = categorySlice.reducer;
export const {setCategory, clearCategory} = categorySlice.actions;