import { Product } from './product.model';

export interface ProductsStateInterface {
    currentProducts: Product[] | null;
    allProducts: Product[] | null;
    isLoading: boolean;
}
