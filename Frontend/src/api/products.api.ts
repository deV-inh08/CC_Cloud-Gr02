import { URL } from "../constants/product";
import { Categories } from "../types/categories.type";
import { ProductList } from "../types/products.type";
import httpProduct from "../utils/httpProduct";
import { SuccessResponse } from "../utils/utils.type";


const ProductApi = {
  getProducts() {
    return httpProduct.get<SuccessResponse<ProductList>>(URL).then((repsone) => {
      return repsone.data
    })
  },
  
  getCategories() {
    return httpProduct.get<SuccessResponse<Categories>>(`${URL}/categories`)
  }
}


export default ProductApi;