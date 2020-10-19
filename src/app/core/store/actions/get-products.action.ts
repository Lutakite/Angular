import { createAction, props } from '@ngrx/store';
import { ProductFilter } from '../../models/product-filter.model';
import { Product } from '../../models/product.model';
import { ActionTypes } from '../action-types';

export const getProductsAction = createAction(
    ActionTypes.GET_PRODUCTS
);

export const getProductsSuccessAction = createAction(
    ActionTypes.GET_PRODUCTS_SUCCESS,
    props<{products: Product[]}>()
);

export const getProductsFailureAction = createAction(
    ActionTypes.GET_PRODUCTS_FAILURE
);

export const getFilteredProductsAction = createAction(
    ActionTypes.GET_FILTERED_PRODUCTS,
    props<{filters: ProductFilter}>()
);

export const getFilteredProductsSuccessAction = createAction(
    ActionTypes.GET_FILTERED_PRODUCTS_SUCCESS,
    props<{products: Product[]}>()
);

export const getFilteredProductsFailureAction = createAction(
    ActionTypes.GET_FILTERED_PRODUCTS_FAILURE
);

