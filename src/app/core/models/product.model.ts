import {ProductType} from "./product_type.model";
import {ProductService} from "../services/product.service"

export class Product {
  id: number;
  name: string;
  product_type: ProductType;
  img: string;
  price: number;
  rating: number;
  rating_num: number;
  delivery: string;
  fresh_days: string;
  discount: boolean;
  price_discount: number;
  products = {};

  constructor(private myService: ProductService) {}

  ngOnInit() {
    this.myService.getProducts()
      .subscribe(res => this.products = res);
  }
}