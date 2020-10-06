import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { ProductFilter } from '../models/product-filter.model';
import { MainCategory } from '../models/main-category.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable()
export class ProductService {
  private readonly _products$ = new BehaviorSubject<Product[]>([]);
  readonly products$ = this._products$.asObservable().pipe(
    shareReplay(1)
  );
  private readonly _filteredProducts$ = new BehaviorSubject<Product[]>([]);
  readonly filteredProducts$ = this._filteredProducts$.asObservable().pipe(
    shareReplay(1)
  );

  constructor(private http: HttpClient) { }

  getProducts(): void {
    this.http.get('../../assets/data/product-types.json').pipe(
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
    ).subscribe(data => {this._products$.next(data); this._filteredProducts$.next(data); });
  }

  getMainCategory(): Observable<MainCategory> {
    return this.http.get('../../assets/data/product-types.json').pipe(
      map(data => {
        const d = 'main_category';
        return data[d]; })
    );
  }

  getFilteredProducts(productFilter: ProductFilter): void {
    console.log('here');
    console.log(productFilter.discount);
    let filteredSortedProducts = this._products$.value.
        filter((product: Product) => (!productFilter.discount || !!product.discount))
        .filter((product: Product) => (!productFilter.brand || productFilter.brand.length === 0 ||
          productFilter.brand.indexOf(product.brand) !== -1))
        .filter((product: Product) => (!productFilter.country || productFilter.country.length === 0
          || productFilter.country.indexOf(product.country) !== -1))
        .filter((product: Product) => (!productFilter.tags || productFilter.tags.length === 0 ||
          [...new Set(product.tags)].filter((item: string) => productFilter.tags.includes(item)).length === productFilter.tags.length ));
    if (productFilter.sort === 'Цена по убыванию') {
      filteredSortedProducts = filteredSortedProducts.sort((prev: Product, next: Product) => {
        const prevPrice = (prev.discount === true) ? prev.priceDiscount : prev.price;
        const nextPrice = (next.discount === true) ? next.priceDiscount : next.price;
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
        const prevPrice = (prev.discount === true) ? prev.priceDiscount : prev.price;
        const nextPrice = (next.discount === true) ? next.priceDiscount : next.price;
        return (prevPrice - nextPrice);
      });
    }
    this._filteredProducts$.next(filteredSortedProducts);
  }
}
