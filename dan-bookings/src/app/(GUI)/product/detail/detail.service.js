class ProductDetailService {

    constructor(endPoint) {
        this.endPoint = endPoint || '/api/product/detail';
    };


    async getProductDetail({ URL } ){
            if(!URL) return null; 

            const searchParams = params ? new URLSearchParams(params) : "";
           
            const response = await fetch(`${this.endPoint}/${URL}?${searchParams}`, { method: "GET" });
            const detail = await response.json();
           
            if(!response.ok) throw new Error(detail?.message)
            return detail;
    };
    async updateProductDetail({ WO_URL }){
          if ( !WO_URL ) return null;

          const body = new FormData();      
          body.append("newDetail",JSON.stringify(newProductDetail));
  
          const response = await fetch(`${this.endPoint}/${WO_URL}`, { method: "PUT", body });
          const updatedDetail = await response.json();
          
          if(!response.ok) throw new Error(updatedDetail?.message);
          
          return updatedDetail;
    };
}

export const productDetailService = new ProductDetailService();