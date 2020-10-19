import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PennyPipe } from 'src/app/core/pipes/penny.pipe';
import { RublePipe } from 'src/app/core/pipes/ruble.pipe';
import { ProductService } from 'src/app/core/services/product.service';
import { GetProductsEffect } from 'src/app/core/store/effects/get-products.effect';
import { reducer } from 'src/app/core/store/reducers';
import { ProductItemsComponent } from '../components/product-items/product-items.component';

@NgModule({
    imports: [
        CommonModule,
        EffectsModule.forFeature([GetProductsEffect]),
        StoreModule.forFeature('products', reducer)
    ],
    declarations: [ProductItemsComponent, RublePipe, PennyPipe],
    exports: [ProductItemsComponent],
    providers: [ProductService]
})
export class ProductItemsModule {}
