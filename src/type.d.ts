interface IFormCategories {
    type: "income" | "expense";
    categoryName: string;
}

interface ICategory extends IFormCategories {
    id: string;
}

interface ICategoriesAPI {
    [key: string]: IFormCategories;
}

interface EditCategory {
    id: string;
    data: IFormCategories;
}

interface ITransactionForm {
    type: "income" | "expense";
    categoryId: string;
    amount: number;
}

interface ISendFormApi {
    categoryId: string;
    amount: number;
    date: string;
}

interface ITransaction extends ITransactionForm {
    id: string;
    date: string;
}

interface ITransactionAPI {
    [key: string]: ISendFormApi;
}