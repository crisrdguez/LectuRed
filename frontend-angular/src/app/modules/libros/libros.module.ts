import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibroComponent } from './libro/libro.component';
import { LibroListasComponent } from './libro-listas/libro-listas.component';
import { ResultadoBusquedaComponent } from './resultado-busqueda/resultado-busqueda.component';
import { LibroDetalleComponent } from './libro-detalle/libro-detalle.component';
import { RouterModule } from '@angular/router';
import { LibrosRoutingModule } from './libros-routing.module';
//import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


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
    LibrosRoutingModule,
    SharedModule

  ],
  exports: [
    LibroComponent,
    LibroListasComponent,
    ResultadoBusquedaComponent,
    LibroDetalleComponent
  ],
  providers: [],
})
export class LibrosModule { }
