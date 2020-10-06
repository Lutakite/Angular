import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../../../app/core/models/product.model';
import { Observable } from 'rxjs';
import { RatingEnum } from 'src/app/core/enums/product.enum';

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductItemsComponent implements OnInit{

  @Input() products$: Observable<Product[]>;
  ratingEnum = RatingEnum;

  constructor() { }

  ngOnInit(): void{
  }
}
