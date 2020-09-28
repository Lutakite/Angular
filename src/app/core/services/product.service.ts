import {Injectable} from "@angular/core";
import 'rxjs/add/operator/pipe';
import {Product} from "../models/product.model";

@Injectable()
export class ProductService {

  getProduct() {
    return new Product({});
  }
}