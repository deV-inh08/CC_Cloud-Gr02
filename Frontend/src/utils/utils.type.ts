import { ProductList } from "../types/products.type"

export interface SuccessResponse<Data> {
  products: SuccessResponse<ProductList[]> | []
  message: string
  data?: Data
};

export interface ErrorResponse<Data> {
  message: string
  data ?: Data
};
