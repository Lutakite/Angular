import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../app/core/services/product.service'
import { Product } from '../../../../../app/core/models/product.model'
import { ProductFilter } from 'src/app/core/models/product-filter.model';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ProductService]
})

export class ProductListComponent implements OnInit{
  products: Product[]=[];
  filters: ProductFilter;

  constructor (public productService: ProductService) {}

  ngOnInit(){
    this.productService.getProducts().subscribe(data => this.products=data);
    this.filters = new ProductFilter;
    this.filters.discount = false;
    this.filters.brand = [];
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
}