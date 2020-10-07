import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent} from './pages/main/components/product-list/product-list.component';
import { ProductFiltersComponent} from './pages/main/components/product-filters/product-filters.component';
import { ProductItemsComponent} from './pages/main/components/product-items/product-items.component';
import { TagsSortComponent } from './pages/main/components/tags-sort/tags-sort.component';
import { ProductService } from './core/services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { RublePipe } from './core/pipes/ruble.pipe';
import { PennyPipe } from './core/pipes/penny.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductFiltersComponent,
    TagsSortComponent,
    ProductItemsComponent,
    RublePipe,
    PennyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
