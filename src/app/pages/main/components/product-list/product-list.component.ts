import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../app/core/services/product.service'
import { Product } from '../../../../../app/core/models/product.model'
import { ProductFilter } from 'src/app/core/models/product-filter.model';
import { MainCategory } from 'src/app/core/models/main-category.model';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ProductService]
})

export class ProductListComponent implements OnInit{
  products: Product[]=[];
  filters: ProductFilter;
  possibleFilters: ProductFilter;
  mainCategory: MainCategory;

  constructor (public productService: ProductService) {}

  ngOnInit(){
    this.productService.getProducts().subscribe(data => this.products=data);
    this.productService.getMainCategory().subscribe(data => this.mainCategory=data);
    this.filters = new ProductFilter;
    this.filters.discount = false;
    this.filters.brand = [];
    this.filters.country = [];
    this.filters.tags = [];
    this.possibleFilters = new ProductFilter;
    this.possibleFilters.brand = [];
    this.productService.getBrands().subscribe(data => this.possibleFilters.brand=data);
    this.possibleFilters.country = [];
    this.productService.getCountries().subscribe(data => this.possibleFilters.country=data);
    this.possibleFilters.tags = [];
    this.productService.getTags().subscribe(data => this.possibleFilters.tags=data);
  }

  ngOnChanges(){
    this.productService.getFilteredProducts(this.filters).subscribe(data => this.products=data);
  }

  setFilterDiscount(){
    this.filters.discount = !this.filters.discount;
    this.productService.getFilteredProducts(this.filters).subscribe(data => this.products=data);
  }

  setFilterBrand(brand){
    if (this.filters.brand.indexOf(brand) == -1) {
      this.filters.brand.push(brand) ;
    }
    else {
      this.filters.brand = this.filters.brand.filter(item => item!=brand);
    }
    this.productService.getFilteredProducts(this.filters).subscribe(data => this.products=data);
  }

  setFilterCountry(country){
    if (this.filters.country.indexOf(country) == -1) {
      this.filters.country.push(country) ;
    }
    else {
      this.filters.country = this.filters.country.filter(item => item!=country);
    }
    this.productService.getFilteredProducts(this.filters).subscribe(data => this.products=data);
  }

  setFilterTag(tag){
    if (this.filters.tags.indexOf(tag) == -1) {
      this.filters.tags.push(tag) ;
    }
    else {
      this.filters.tags = this.filters.tags.filter(item => item!=tag);
    }
    this.productService.getFilteredProducts(this.filters).subscribe(data => this.products=data);
  }
}