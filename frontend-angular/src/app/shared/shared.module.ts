import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
//Pipe
import { TruncateTextPipe } from './pipes/corta-texto.pipe';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    NavbarComponent,
    TruncateTextPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    HttpClientModule
  ],
  exports: [
    NavbarComponent,
    PageNotFoundComponent,
    TruncateTextPipe,
    MaterialModule
  ]
})
export class SharedModule { }
