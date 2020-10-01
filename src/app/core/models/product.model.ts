import {ProductType} from "./product-type.model";

export class Product {
  id: number;
  name: string;
  desc: string;
  product_type: ProductType;
  img: string;
  price: number;
  rating: number;
  rating_num: number;
  delivery: string;
  fresh_days: string;
  discount: boolean;
  price_discount: number;
  discount_num: number;
  brand: string;
  country: string;
}