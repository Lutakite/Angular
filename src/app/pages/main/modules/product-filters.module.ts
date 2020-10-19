import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductService } from 'src/app/core/services/product.service';
import { GetProductsEffect } from 'src/app/core/store/effects/get-products.effect';
import { reducer } from 'src/app/core/store/reducers';
import { ProductFiltersComponent } from '../components/product-filters/product-filters.component';

@NgModule({
    imports: [
        CommonModule,
        EffectsModule.forFeature([GetProductsEffect]),
        StoreModule.forFeature('products', reducer)
    ],
    declarations: [ProductFiltersComponent],
    exports: [ProductFiltersComponent],
    providers: [ProductService]
})
export class ProductFiltersModule {}
