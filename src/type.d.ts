interface IFormCategories {
    type: string;
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