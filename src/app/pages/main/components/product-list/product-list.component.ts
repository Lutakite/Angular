import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../../../app/core/services/product.service';
import { Product } from '../../../../../app/core/models/product.model';
import { ProductFilter } from 'src/app/core/models/product-filter.model';
import { MainCategory } from 'src/app/core/models/main-category.model';
import { SortOption } from 'src/app/core/models/sort-option.model';
import { RatingEnum } from 'src/app/core/enums/product.enum';
import { Subscription } from 'rxjs';
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
  mainCategory: MainCategory;
  showSortOptions = false;
  sortOptions: SortOption[] = [{name: 'По популярности', type: false},
                              {name: 'Цена по убыванию', type: false},
                              {name: 'Цена по возрастанию', type: true}];
  filters: ProductFilter = new ProductFilter();
  possibleFilters: ProductFilter = new ProductFilter();
  currentSortOption: SortOption = this.sortOptions[0];
  ratingEnum = RatingEnum;
  subscriptions: Subscription = new Subscription();

  constructor(public productService: ProductService) {}

  ngOnInit(): void{
    this.subscriptions.add(this.productService.getProducts().subscribe(data => this.products = data));
    this.subscriptions.add(this.productService.getMainCategory().subscribe(data => this.mainCategory = data));
    this.subscriptions.add(this.productService.getBrands().subscribe(data => this.possibleFilters.brand = data));
    this.subscriptions.add(this.productService.getCountries().subscribe(data => this.possibleFilters.country = data));
    this.subscriptions.add(this.productService.getTags().subscribe(data => this.possibleFilters.tags = data));
    this.filters.sort = this.currentSortOption.name;
  }

  setFilterDiscount(): void{
    this.filters.discount = !this.filters.discount;
    this.subscriptions.add(this.productService.getFilteredProducts(this.filters).subscribe(data => this.products = data));
  }

  setFilterBrand(brand: string): void{
    if (this.filters.brand.indexOf(brand) === -1) {
      this.filters.brand.push(brand) ;
    }
    else {
      this.filters.brand = this.filters.brand.filter(item => item !== brand);
    }
    this.subscriptions.add(this.productService.getFilteredProducts(this.filters).subscribe(data => this.products = data));
  }

  setFilterCountry(country: string): void{
    if (this.filters.country.indexOf(country) === -1) {
      this.filters.country.push(country) ;
    }
    else {
      this.filters.country = this.filters.country.filter(item => item !== country);
    }
    this.subscriptions.add(this.productService.getFilteredProducts(this.filters).subscribe(data => this.products = data));
  }

  setFilterTag(tag: string): void{
    if (this.filters.tags.indexOf(tag) === -1) {
      this.filters.tags.push(tag);
    }
    else {
      this.filters.tags = this.filters.tags.filter(item => item !== tag);
    }
    this.subscriptions.add(this.productService.getFilteredProducts(this.filters).subscribe(data => this.products = data));
  }

  setShowSortOptions(): void{
    this.showSortOptions = !this.showSortOptions;
  }

  setSortOption(option: SortOption): void{
    this.currentSortOption = option;
    this.filters.sort = this.currentSortOption.name;
    this.subscriptions.add(this.productService.getFilteredProducts(this.filters).subscribe(data => this.products = data));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
