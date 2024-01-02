import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibroComponent } from './libro/libro.component';
import { LibroListasComponent } from './libro-listas/libro-listas.component';
import { ResultadoBusquedaComponent } from './resultado-busqueda/resultado-busqueda.component';
import { LibroDetalleComponent } from './libro-detalle/libro-detalle.component';
import { RouterModule } from '@angular/router';
import { LibrosRoutingModule } from './libros-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LibroCategoriasComponent } from './libro-categorias/libro-categorias.component';
import { LibroActividadComponent } from './libro-actividad/libro-actividad.component';
import { LibroMisLibrosComponent } from './libro-mis-libros/libro-mis-libros.component';
import { LibroRatingComponent } from './libro-rating/libro-rating.component';
import { EstrellasComponent } from './estrellas/estrellas.component';
import { PuntuacionMediaComponent } from './puntuacion-media/puntuacion-media.component';
import { MiActividadComponent } from './mi-actividad/mi-actividad.component';


@NgModule({
  declarations: [
    LibroComponent,
    LibroListasComponent,
    ResultadoBusquedaComponent,
    LibroDetalleComponent,
    LibroCategoriasComponent,
    LibroActividadComponent,
    LibroMisLibrosComponent,
    LibroRatingComponent,
    EstrellasComponent,
    PuntuacionMediaComponent,
    MiActividadComponent
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
    LibroDetalleComponent,
    LibroCategoriasComponent,
    LibroActividadComponent,
    LibroMisLibrosComponent
  ],
  providers: [],
})
export class LibrosModule { }
