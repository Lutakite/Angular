import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../../../app/core/services/product.service';
import { Product } from '../../../../../app/core/models/product.model';
import { ProductFilter } from 'src/app/core/models/product-filter.model';
import { MainCategory } from 'src/app/core/models/main-category.model';
import { SortOption } from 'src/app/core/models/sort-option.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { ProductFiltersComponent } from '../product-filters/product-filters.component';
import { TagsSortComponent } from '../tags-sort/tags-sort.component';
import { ProductItemsComponent } from '../product-items/product-items.component';

import { RublePipe } from '../../../../../app/core/pipes/RublePipe.pipe';
import { PennyPipe } from '../../../../../app/core/pipes/PennyPipe.pipe';

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

  constructor(public productService: ProductService) {  }

  get products$(): Observable<Product[]> {
    return this.productService.products$;
  }

  get filteredProducts$(): Observable<Product[]> {
    return this.productService.filteredProducts$;
  }

  get brands$(): Observable<string[]>{
    return this.productService.products$.pipe(
      map(products => {
        const unUniqbrands = products.filter((x: Product) => x.brand).map((x: Product) => x.brand);
        return Array.from(new Set(unUniqbrands)); })
    );
  }

  get countries$(): Observable<string[]>{
    return this.productService.products$.pipe(
      map(products => {
        const unUniqCountries = products.filter((x: Product) => x.country).map((x: Product) => x.country);
        return Array.from(new Set(unUniqCountries)); })
    );
  }

  get tags$(): Observable<string[]>{
    return this.productService.products$.pipe(
      map(products => {
        const unUniqTags = (products.filter((x: Product) => x.tags).map((x: Product) => x.tags));
        return Array.from(new Set(unUniqTags.reduce((acc, val) => acc.concat(val), []))); })
    );
  }

  get filteredBrands$(): Observable<string[]>{
    return this.productService.filteredProducts$.pipe(
      map(products => {
        const unUniqbrands = products.filter((x: Product) => x.brand).map((x: Product) => x.brand);
        return Array.from(new Set(unUniqbrands)); })
    );
  }

  get filteredCountries$(): Observable<string[]>{
    return this.productService.filteredProducts$.pipe(
      map(products => {
        const unUniqCountries = products.filter((x: Product) => x.country).map((x: Product) => x.country);
        return Array.from(new Set(unUniqCountries)); })
    );
  }

  get filteredTags$(): Observable<string[]>{
    return this.productService.filteredProducts$.pipe(
      map(products => {
        const unUniqTags = (products.filter((x: Product) => x.tags).map((x: Product) => x.tags));
        return Array.from(new Set(unUniqTags.reduce((acc, val) => acc.concat(val), []))); })
    );
  }

  ngOnInit(): void{
    this.productService.getProducts();
    this.subscriptions.add(this.productService.getMainCategory().subscribe(data => this.mainCategory = data));
    this.filters.sort = 'По популярности';
  }

  onFilterDiscount(): void{
    this.filters.discount = !this.filters.discount;
    this.productService.getFilteredProducts(this.filters);
  }

  onFilterBrands(brand: string): void{
    if (this.filters.brand.indexOf(brand) === -1) {
      this.filters.brand.push(brand) ;
    }
    else {
      this.filters.brand = this.filters.brand.filter(item => item !== brand);
    }
    this.productService.getFilteredProducts(this.filters);
  }

  onFilterCountries(country: string): void{
    if (this.filters.country.indexOf(country) === -1) {
      this.filters.country.push(country) ;
    }
    else {
      this.filters.country = this.filters.country.filter(item => item !== country);
    }
    this.productService.getFilteredProducts(this.filters);
  }

  onFilterTag(tag: string): void{
    if (this.filters.tags.indexOf(tag) === -1) {
      this.filters.tags.push(tag);
    }
    else {
      this.filters.tags = this.filters.tags.filter(item => item !== tag);
    }
    this.productService.getFilteredProducts(this.filters);
  }

  onSortOption(option: SortOption): void{
    this.filters.sort = option.name;
    this.productService.getFilteredProducts(this.filters);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
