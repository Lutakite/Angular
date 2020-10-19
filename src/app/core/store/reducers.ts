import { Action, createReducer, on } from '@ngrx/store';
import { ProductsStateInterface } from '../models/products-state.interface';
import { getProductsAction,
    getFilteredProductsAction,
    getProductsFailureAction,
    getProductsSuccessAction,
    getFilteredProductsSuccessAction,
    getFilteredProductsFailureAction
} from './actions/get-products.action';

const initialState: ProductsStateInterface = {
    allProducts: null,
    currentProducts: null,
    isLoading: false
};

const productsReducer = createReducer(
    initialState,
    on(
        getProductsAction,
        (state): ProductsStateInterface => ({
            ...state,
            isLoading: true
        })
    ),
    on(
        getProductsSuccessAction,
        (state, action): ProductsStateInterface => ({
            ...state,
            isLoading: false,
            allProducts: action.products,
            currentProducts: action.products
        })
    ),
    on(
        getProductsFailureAction,
        (state): ProductsStateInterface => ({
            ...state,
            isLoading: false
        })
    ),
    on(
        getFilteredProductsAction,
        (state): ProductsStateInterface => ({
            ...state,
            isLoading: true
    })),
    on(
        getFilteredProductsSuccessAction,
        (state, action): ProductsStateInterface => ({
            ...state,
            currentProducts: action.products,
            isLoading: false
    })),
    on(
        getFilteredProductsFailureAction,
        (state): ProductsStateInterface => ({
            ...state,
            isLoading: false
    }))
);

export function reducer(state: ProductsStateInterface, action: Action): any {
    return productsReducer(state, action);
}
