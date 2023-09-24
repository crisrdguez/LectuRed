import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibroComponent } from './libro/libro.component';
import { LibroListasComponent } from './libro-listas/libro-listas.component';
import { ResultadoBusquedaComponent } from './resultado-busqueda/resultado-busqueda.component';
import { LibroDetalleComponent } from './libro-detalle/libro-detalle.component';
import { RouterModule } from '@angular/router';
import { LibrosRoutingModule } from './libros-routing.module';



@NgModule({
  declarations: [
    LibroComponent,
    LibroListasComponent,
    ResultadoBusquedaComponent,
    LibroDetalleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LibrosRoutingModule

  ],
  exports: [
    LibroComponent,
    LibroListasComponent,
    ResultadoBusquedaComponent,
    LibroDetalleComponent
  ]
})
export class LibrosModule { }
