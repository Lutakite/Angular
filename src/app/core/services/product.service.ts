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

  getBrands()  : Observable<string[]> {
    return this.http.get('../../assets/data/product-types.json').pipe(
      map(data => {
        let brands = data["products"].filter(x => x.brand).map(x => x.brand);
        //let brands = Array.from(productList, ({brand}) => brand);
        brands = Array.from(new Set(brands));     
        return brands;})
    );
  }

  getCountries()  : Observable<string[]> {
    return this.http.get('../../assets/data/product-types.json').pipe(
      map(data => {
        let countries = data["products"].filter(x => x.country).map(x => x.country);
        countries = Array.from(new Set(countries));     
        return countries;})
    );
  }

  getFilteredProducts(productFilter)  : Observable<Product[]> {
    console.log(productFilter);
    return this.http.get('../../assets/data/product-types.json').pipe(
      map(data => {
        let productList = data["products"];
        return productList.filter(product => (!productFilter.discount || !!product.discount)).filter(product => (!productFilter.brand || productFilter.brand.length===0 || productFilter.brand.indexOf(product.brand)!=-1)).filter(product => (!productFilter.country || productFilter.country.length===0 || productFilter.country.indexOf(product.country)!=-1));
      })
    );
  }

}