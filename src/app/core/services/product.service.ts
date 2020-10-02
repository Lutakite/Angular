import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { MainCategory } from '../models/main-category.model';
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

  getMainCategory()  : Observable<MainCategory> {
    return this.http.get('../../assets/data/product-types.json').pipe(
      map(data => {
        return data["main_category"];})
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

  getTags()  : Observable<string[]> {
    return this.http.get('../../assets/data/product-types.json').pipe(
      map(data => {
        let tags = data["products"].filter(x => x.tags).map(x => x.tags);
        tags = Array.from(new Set(tags.flat()));
        return tags;})
    );
  }

  getFilteredProducts(productFilter)  : Observable<Product[]> {
    return this.http.get('../../assets/data/product-types.json').pipe(
      map(data => {
        let productList = data["products"];
        return productList.filter(product => (!productFilter.discount || !!product.discount)).filter(product => (!productFilter.brand || productFilter.brand.length===0 || productFilter.brand.indexOf(product.brand)!=-1)).filter(product => (!productFilter.country || productFilter.country.length===0 || productFilter.country.indexOf(product.country)!=-1)).filter(product => (!productFilter.tags || productFilter.tags.length===0 || [...new Set(product.tags)].filter(item => productFilter.tags.includes(item)).length===productFilter.tags.length ));
      })
    );
  }

}