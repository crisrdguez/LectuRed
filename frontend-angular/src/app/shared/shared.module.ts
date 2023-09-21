import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
    PageNotFoundComponent
  ]
})
export class SharedModule { }
