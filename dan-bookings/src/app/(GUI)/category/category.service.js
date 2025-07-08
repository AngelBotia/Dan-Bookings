
export class CategoryService {

    constructor(endPoint) {
        this.endPoint = endPoint || '/api/settings/categories';
    };

    async getCategories(params={}){
        try {
            const searchParams = params ? new URLSearchParams(params) : "";
            const categoryData = await fetch(`${this.endPoint}?${searchParams}`, { method: "GET" });
            if(!categoryData.ok) return null;
            
            const categories = await categoryData.json() || [];
            return categories;
          } catch (error) {
            return null;
          }
    }
}

export const categoryService = new CategoryService()