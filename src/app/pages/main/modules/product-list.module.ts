import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductService } from 'src/app/core/services/product.service';
import { GetProductsEffect } from 'src/app/core/store/effects/get-products.effect';
import { reducer } from 'src/app/core/store/reducers';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductFiltersModule } from './product-filters.module';
import { ProductItemsModule } from './product-items.module';
import { TagsSortModule } from './tags-sort.module';

const routes = [
    {
        path: '',
        component: ProductListComponent
    }
];
@NgModule({
    imports: [
        CommonModule,
        EffectsModule.forFeature([GetProductsEffect]),
        StoreModule.forFeature('products', reducer),
        RouterModule,
        RouterModule.forChild(routes),
        ProductFiltersModule,
        ProductItemsModule,
        TagsSortModule
    ],
    declarations: [ProductListComponent],
    exports: [],
    providers: [ProductService]
})
export class ProductListModule {}
