import {ProductType} from './product-type.model';

export class Product {
  id: number;
  name: string;
  desc: string;
  productType: ProductType;
  img: string;
  price: number;
  rating: number;
  ratingNum: number;
  delivery: string;
  freshDays: string;
  discount: boolean;
  priceDiscount: number;
  discountNum: number;
  brand: string;
  country: string;
  tags: string[];
}
