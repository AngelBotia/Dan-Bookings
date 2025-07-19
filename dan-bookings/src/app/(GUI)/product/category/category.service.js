
export class CategoryService {

    constructor(endPoint) {
        this.endPoint = endPoint || '/api/settings/categories';
    };

    async getCategories(params={}){
            const searchParams = params ? new URLSearchParams(params) : "";
            const categoryData = await fetch(`${this.endPoint}?${searchParams}`, { method: "GET" });
            const categories = await categoryData.json() || [];
            if(!categoryData.ok) throw new Error(categories?.message);
            return categories;
    }
}

export const categoryService = new CategoryService()