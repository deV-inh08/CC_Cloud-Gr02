import { QueryConfig } from "../types/products.type";
import { URL } from "../constants/product";
import { Categories } from "../types/categories.type";
import { ProductList } from "../types/products.type";
import httpProduct from "../utils/httpProduct";
import { SuccessResponse } from "../utils/utils.type";


const ProductApi = {
  getProducts(params: QueryConfig) {
    return httpProduct.get<SuccessResponse<ProductList>>(URL, { params }).then((repsone) => {
      return repsone.data
    })
  },
  
  getCategories() {
    return httpProduct.get<SuccessResponse<Categories>>(`${URL}/categories`)
  },

  getProductByCategory(category: string, params?: QueryConfig) {
    return httpProduct.get<SuccessResponse<ProductList>>(`products/category/${category}`, { params }).then((response) => {
      return response.data
    })
  }
}


export default ProductApi;