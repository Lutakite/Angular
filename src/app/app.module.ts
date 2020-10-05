import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent} from './pages/main/components/product-list/product-list.component';
import { ProductService } from './core/services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { RublePipe } from './core/pipes/RublePipe.pipe';
import { PennyPipe } from './core/pipes/PennyPipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
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
