import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { ProductFilter } from '../models/product-filter.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts()  : Observable<Product[]> {
    return this.http.get('../../assets/data/product-types.json').pipe(
      map(data => {
        let productList = data["products"];
        return productList;})
    );
  }

  getFilteredProducts(productFilter)  : Observable<Product[]> {
    console.log(productFilter);
    return this.http.get('../../assets/data/product-types.json').pipe(
      map(data => {
        let productList = data["products"];
        return productList.filter(product => (!productFilter.discount || !!product.discount)).filter(product => (!productFilter.brand || productFilter.brand.length===0 || productFilter.brand.indexOf(product.brand)!=-1));
      })
    );
  }

}