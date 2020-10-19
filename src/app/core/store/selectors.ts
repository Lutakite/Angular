import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import { ProductsStateInterface } from '../models/products-state.interface';

export const productsFeatureSelector = createFeatureSelector<
    AppStateInterface,
    ProductsStateInterface
>('products');

export const allProductsSelector = createSelector(
    productsFeatureSelector,
    (productsState: ProductsStateInterface) => productsState.allProducts
);

export const currentProductsSelector = createSelector(
    productsFeatureSelector,
    (productsState: ProductsStateInterface) => productsState.currentProducts
);
