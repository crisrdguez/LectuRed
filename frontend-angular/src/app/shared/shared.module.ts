import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../modules/material/material.module';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent,
    PageNotFoundComponent,
    MaterialModule
  ]
})
export class SharedModule { }
