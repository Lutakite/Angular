import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { getFilteredProductsAction,
    getFilteredProductsFailureAction,
    getFilteredProductsSuccessAction,
    getProductsAction,
    getProductsFailureAction,
    getProductsSuccessAction
} from '../actions/get-products.action';

@Injectable()
export class GetProductsEffect{

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) {}

    getProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getProductsAction),
            switchMap(() => {
                return this.productService.getProducts().pipe(
                    map((products: Product[]) => {
                        return getProductsSuccessAction({products});
                    }),
                    catchError(() => {
                        return of(getProductsFailureAction());
                    })
                );
            })
    ));

    getFilteredProducts$ = createEffect(() =>
    this.actions$.pipe(
        ofType(getFilteredProductsAction),
        switchMap(({filters}) => {
            return this.productService.getFilteredProducts(filters).pipe(
                map((products: Product[]) => {
                    return getFilteredProductsSuccessAction({products});
                }),
                catchError(() => {
                    return of(getFilteredProductsFailureAction());
                })
            );
        })));
        /*map(({filters}) => {
            return getFilteredProductsSuccessAction(
                {products: this.productService.getFilteredProducts(filters)}
            );
        })*/
}
