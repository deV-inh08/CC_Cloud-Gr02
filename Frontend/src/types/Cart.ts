import { Product } from "./products.type";

export interface CartType extends Product{
  quantity: number;
}