import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from "./pages/main/components/product-list/product-list.component";
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "test" },
  { path: "test", component: ProductListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule,
    BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
