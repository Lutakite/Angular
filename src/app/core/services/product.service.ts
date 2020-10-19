import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { ProductFilter } from '../models/product-filter.model';
import { MainCategory } from '../models/main-category.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { GetProductsResponseInterface } from '../models/get-products-response.interface';
import { allProductsSelector } from '../store/selectors';

@Injectable()
export class ProductService {

  private products: Product[] | null;
  productsSubscription = this.store.
    pipe(select(allProductsSelector))
    .subscribe((products: Product[] | null) => {
        this.products = products;
    });

  constructor(private http: HttpClient, private store: Store) { }


  setFilter(filter: ProductFilter): ProductFilter {
    return filter;
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<GetProductsResponseInterface>('../../assets/data/product-types.json').pipe(
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

  getFilteredProducts(productFilter: ProductFilter): Observable<Product[]> {
    let filteredSortedProducts = this.products
        .filter((product: Product) => (!productFilter.discount || !!product.discount))
        .filter((product: Product) => (!productFilter.brand || !productFilter.brand.length ||
          productFilter.brand.includes(product.brand)))
        .filter((product: Product) => (!productFilter.country || !productFilter.country.length ||
          productFilter.country.includes(product.country)))
        .filter((product: Product) => (!productFilter.tags || !productFilter.tags.length ||
          [...new Set(product.tags)].filter((item: string) => productFilter.tags.includes(item)).length === productFilter.tags.length ));
    if (productFilter.sort === 'Цена по убыванию') {
      filteredSortedProducts = filteredSortedProducts.sort((prev: Product, next: Product) => {
        const prevPrice = prev.discount ? prev.priceDiscount : prev.price;
        const nextPrice = next.discount ? next.priceDiscount : next.price;
        return (nextPrice - prevPrice);
      });
    }
    if (productFilter.sort === 'По популярности') {
      filteredSortedProducts = filteredSortedProducts.sort((prev: Product, next: Product) => {
        if (next.rating < prev.rating) { return -1; }
        if (next.rating > prev.rating) { return 1; }
        if (next.ratingNum < prev.ratingNum) { return -1; }
        if (next.ratingNum > prev.ratingNum) { return 1; }
        return 1;
      });
    }
    if (productFilter.sort === 'Цена по возрастанию') {
      filteredSortedProducts = filteredSortedProducts.sort((prev: Product, next: Product) => {
        const prevPrice = prev.discount ? prev.priceDiscount : prev.price;
        const nextPrice = next.discount ? next.priceDiscount : next.price;
        return (prevPrice - nextPrice);
      });
    }
    return of(filteredSortedProducts);
  }
}
