import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../../../app/core/services/product.service';
import { Product } from '../../../../../app/core/models/product.model';
import { ProductFilter } from 'src/app/core/models/product-filter.model';
import { MainCategory } from 'src/app/core/models/main-category.model';
import { SortOption } from 'src/app/core/models/sort-option.model';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { allProductsSelector, currentProductsSelector } from 'src/app/core/store/selectors';
import { getFilteredProductsAction, getProductsAction } from 'src/app/core/store/actions/get-products.action';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ProductService]
})

export class ProductListComponent implements OnInit, OnDestroy{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  mainCategory: MainCategory;
  sortOptions: SortOption[] = [{name: 'По популярности', type: false},
                              {name: 'Цена по убыванию', type: false},
                              {name: 'Цена по возрастанию', type: true}];
  filters: ProductFilter = new ProductFilter();
  subscriptions: Subscription = new Subscription();

  constructor(public productService: ProductService, private store: Store) {  }

  get products$(): Observable<Product[]> {
    return this.store.select(allProductsSelector);
    // return this.productService.products$;
  }

  get filteredProducts$(): Observable<Product[]> {
    return this.store.select(currentProductsSelector);
    // return this.productService.filteredProducts$;
  }

  get brands$(): Observable<string[]>{
    return this.products$.pipe(
      map(products => {
        const unUniqbrands = products.filter((x: Product) => x.brand).map((x: Product) => x.brand);
        return Array.from(new Set(unUniqbrands)); })
    );
  }

  get countries$(): Observable<string[]>{
    return this.products$.pipe(
      map(products => {
        const unUniqCountries = products.filter((x: Product) => x.country).map((x: Product) => x.country);
        return Array.from(new Set(unUniqCountries)); })
    );
  }

  get tags$(): Observable<string[]>{
    return this.products$.pipe(
      map(products => {
        const unUniqTags = (products.filter((x: Product) => x.tags).map((x: Product) => x.tags));
        return Array.from(new Set(unUniqTags.reduce((acc, val) => acc.concat(val), []))); })
    );
  }

  get filteredBrands$(): Observable<string[]>{
    return this.filteredProducts$.pipe(
      map(products => {
        const unUniqbrands = products.filter((x: Product) => x.brand).map((x: Product) => x.brand);
        return Array.from(new Set(unUniqbrands)); })
    );
  }

  get filteredCountries$(): Observable<string[]>{
    return this.filteredProducts$.pipe(
      map(products => {
        const unUniqCountries = products.filter((x: Product) => x.country).map((x: Product) => x.country);
        return Array.from(new Set(unUniqCountries)); })
    );
  }

  get filteredTags$(): Observable<string[]>{
    return this.filteredProducts$.pipe(
      map(products => {
        const unUniqTags = (products.filter((x: Product) => x.tags).map((x: Product) => x.tags));
        return Array.from(new Set(unUniqTags.reduce((acc, val) => acc.concat(val), []))); })
    );
  }

  ngOnInit(): void{
    // this.productService.getProducts();
    this.subscriptions.add(this.productService.getMainCategory().subscribe(data => this.mainCategory = data));
    this.filters.sort = 'По популярности';
    this.fetchData();
  }

  fetchData(): void {
    this.store.dispatch(getProductsAction());
  }

  fetchFilteredData(): void {
    this.store.dispatch(getFilteredProductsAction({filters: this.filters}));
  }

  onFilterDiscount(): void{
    this.filters = {
      discount: !this.filters.discount,
      brand: this.filters.brand,
      country: this.filters.country,
      tags: this.filters.tags,
      sort: this.filters.sort,
    };

    this.fetchFilteredData();
  }

  onFilterBrands(brand: string): void{
    this.filters = {
      discount: this.filters.discount,
      brand: (this.filters.brand.includes(brand) ?
        this.filters.brand.filter(item => item !== brand) :
          [...this.filters.brand, brand]),
      country: this.filters.country,
      tags: this.filters.tags,
      sort: this.filters.sort,
    };
    this.fetchFilteredData();
  }

  onFilterCountries(country: string): void{
    this.filters =  {
      discount: this.filters.discount,
      brand: this.filters.brand,
      country: (this.filters.country.includes(country) ?
          this.filters.country.filter(item => item !== country) :
          [...this.filters.country, country]),
      tags: this.filters.tags,
      sort: this.filters.sort,
    };
    this.fetchFilteredData();
  }

  onFilterTag(tag: string): void{
    this.filters =  {
      discount: this.filters.discount,
      brand: this.filters.brand,
      country: this.filters.country,
      tags: (this.filters.tags.includes(tag) ?
          this.filters.tags.filter(item => item !== tag) :
          [...this.filters.tags, tag]),
      sort: this.filters.sort,
    };
    this.fetchFilteredData();
  }

  onSortOption(option: SortOption): void{
    this.filters =  {
      discount: this.filters.discount,
      brand: this.filters.brand,
      country: this.filters.country,
      tags: this.filters.tags,
      sort: option.name,
    };
    this.fetchFilteredData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
