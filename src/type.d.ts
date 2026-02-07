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