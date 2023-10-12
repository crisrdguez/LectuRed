import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Routing
import { RouterModule, Routes } from '@angular/router';
//Componentes del modulo libro
import { LibroListasComponent } from './libro-listas/libro-listas.component';
import { LibroDetalleComponent } from './libro-detalle/libro-detalle.component';
import { ResultadoBusquedaComponent } from './resultado-busqueda/resultado-busqueda.component';
import { LibroCategoriasComponent } from './libro-categorias/libro-categorias.component';
//import { LibroActividadComponent } from './libro-actividad/libro-actividad.component';


//Rutas secundarias
const routes: Routes = [
  {
      path:'', //me lo define el sistema de rutas padre, por eso lo dejo vacio

      children:[//rutas hijas
          {path: 'libro-listas', component:LibroListasComponent },
          {path: 'libro-detalle/:id', component:LibroDetalleComponent },
          {path: 'resultado-busqueda', component:ResultadoBusquedaComponent},
          {path: 'categorias/:subject', component:LibroCategoriasComponent},
          //{path: 'actividad', component:LibroActividadComponent},
          {path: '**', redirectTo:'libro-listas'}//cualquier otro path va a redirigir al login
      ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ]
})
export class LibrosRoutingModule { }
