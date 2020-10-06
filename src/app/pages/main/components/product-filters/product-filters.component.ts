import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductFiltersComponent implements OnInit{

  @Input() brands$: Observable<string[]>;
  @Input() countries$: Observable<string[]>;
  @Input() filteredBrands$: Observable<string[]>;
  @Input() filteredCountries$: Observable<string[]>;
  @Output() filterBrands: EventEmitter<string> = new EventEmitter();
  @Output() filterCountrу: EventEmitter<string> = new EventEmitter();
  @Output() filterDiscount: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void{
  }

  setFilterBrand(brand: string): void {
    this.filterBrands.emit(brand);
  }

  setFilterCountry(country: string): void {
    this.filterCountrу.emit(country);
  }

  setFilterDiscount(): void {
    this.filterDiscount.emit(true);
  }
}
