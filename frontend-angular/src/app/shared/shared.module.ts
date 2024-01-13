import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
//Pipe
import { TruncateTextPipe } from './pipes/corta-texto.pipe';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    NavbarComponent,
    TruncateTextPipe,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    TruncateTextPipe,
    MaterialModule,
    FormsModule
  ]
})
export class SharedModule { }
