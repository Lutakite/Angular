import { MainCategory } from './main-category.model';
import { Product } from './product.model';

export interface GetProductsResponseInterface {
    main_category: MainCategory;
    products: Product[];
}
