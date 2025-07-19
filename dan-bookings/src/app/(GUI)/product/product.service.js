class ProductService {

  constructor(endPoint) {
    this.endPoint = endPoint || '/api/work';
  };

  async getProducts(params = {}) {
    const searchParams = params ? new URLSearchParams(params) : "";

    const response = await fetch(`${this.endPoint}?${searchParams}`, { method: "GET" });
    const productsJson = await response.json() || [];

    if (!response.ok) throw new Error(productsJson?.message);
    return productsJson;

  };
  async createProduct(product) {
    const { WO_NAME, IMAGE_URL, languageAPP } = product;
    if (!WO_NAME || !IMAGE_URL?.length) return null;
    
    const imgsToSend = IMAGE_URL?.map(file => {
      const { img, type } = file;
      return { img, type }
    })

    const body = new FormData();
    body.append('product', JSON.stringify({ ...product, IMAGE_URL: imgsToSend }));

    const response = await fetch(this.endPoint, { method: "POST", body });
    const newProduct = await response.json();

    if (!response.ok) throw new Error(newProduct?.message)
    return newProduct;

  };
  async updateProduct(newProduct = {}) {
    if (!newProduct?.ID_WORK) return null;

    const body = new FormData();
    body.append("newProduct", JSON.stringify(newProduct));

    const response = await fetch(this.endPoint, { method: "PUT", body });
    const updatedProduct = await response.json();

    if (!response.ok) throw new Error(updatedProduct?.message)
    return updatedProduct;
  };

  async deleteProduct({ ID_WORK, URL, IMAGE_URL }) {
    if (!ID_WORK || !URL) return null;
    const body = new FormData();
    body.append("ID", JSON.stringify(ID_WORK));
    body.append("URL", JSON.stringify(URL));
    body.append("IMAGE_URL", JSON.stringify(IMAGE_URL))

    const response = await fetch(this.endPoint, { method: "DELETE", body });
    const deletedProduct = await response.json();

    if (!response.ok) throw new Error(deletedProduct?.message);
    return deletedProduct || null;
  };


}

export const productService = new ProductService();