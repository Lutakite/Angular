import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { ProductFilter } from '../models/product-filter.model';
import { MainCategory } from '../models/main-category.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get('../../assets/data/product-types.json').pipe(
      map(data => {
        const x = 'products';
        return data[x].sort((prev: Product, next: Product) => {
          if (next.rating < prev.rating) { return -1; }
          if (next.rating > prev.rating) { return 1; }
          if (next.ratingNum < prev.ratingNum) { return -1; }
          if (next.ratingNum > prev.ratingNum) { return 1; }
          return 1;
        });
      })
    );
  }

  getMainCategory(): Observable<MainCategory> {
    return this.http.get('../../assets/data/product-types.json').pipe(
      map(data => {
        const d = 'main_category';
        return data[d]; })
    );
  }

  getBrands(): Observable<string[]> {
    return this.http.get('../../assets/data/product-types.json').pipe(
      map(data => {
        const d = 'products';
        let brands = data[d].filter(x => x.brand).map(x => x.brand);
        brands = Array.from(new Set(brands));
        return brands; })
    );
  }

  getCountries(): Observable<string[]> {
    return this.http.get('../../assets/data/product-types.json').pipe(
      map(data => {
        const d = 'products';
        let countries = data[d].filter((x: Product) => x.country).map((x: Product) => x.country);
        countries = Array.from(new Set(countries));
        return countries; })
    );
  }

  getTags(): Observable<string[]> {
    return this.http.get('../../assets/data/product-types.json').pipe(
      map(data => {
        const d = 'products';
        let tags = data[d].filter((x: Product) => x.tags).map((x: Product) => x.tags);
        tags = Array.from(new Set(tags.flat()));
        return tags; })
    );
  }

  getFilteredProducts(productFilter: ProductFilter): Observable<Product[]> {
    return this.http.get('../../assets/data/product-types.json').pipe(
      map(data => {
        const d = 'products';
        let result = data[d].filter((product: Product) => (!productFilter.discount || !!product.discount))
        .filter((product: Product) => (!productFilter.brand || productFilter.brand.length === 0 ||
          productFilter.brand.indexOf(product.brand) !== -1))
        .filter((product: Product) => (!productFilter.country || productFilter.country.length === 0
          || productFilter.country.indexOf(product.country) !== -1))
        .filter((product: Product) => (!productFilter.tags || productFilter.tags.length === 0 ||
          [...new Set(product.tags)].filter((item: string) => productFilter.tags.includes(item)).length === productFilter.tags.length ));

        if (productFilter.sort === 'Цена по убыванию') {
          result = result.sort((prev: Product, next: Product) => {
            const prevPrice = (prev.discount === true) ? prev.priceDiscount : prev.price;
            const nextPrice = (next.discount === true) ? next.priceDiscount : next.price;
            return (nextPrice - prevPrice);
          });
        }
        if (productFilter.sort === 'По популярности') {
          result = result.sort((prev: Product, next: Product) => {
            if (next.rating < prev.rating) { return -1; }
            if (next.rating > prev.rating) { return 1; }
            if (next.ratingNum < prev.ratingNum) { return -1; }
            if (next.ratingNum > prev.ratingNum) { return 1; }
            return 1;
          });
        }
        if (productFilter.sort === 'Цена по возрастанию') {
          result = result.sort((prev: Product, next: Product) => {
            const prevPrice = (prev.discount === true) ? prev.priceDiscount : prev.price;
            const nextPrice = (next.discount === true) ? next.priceDiscount : next.price;
            return (prevPrice - nextPrice);
          });
        }
        return result;
      }));
    }
}
