import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibroCategoriasComponent } from './modules/libros/libro-categorias/libro-categorias.component';
//Componentes
//import { HomePageComponent } from './modules/home/pages/home-page/home-page.component';
//import { ResultadoBusquedaComponent } from './modules/libros/resultado-busqueda/resultado-busqueda.component';

const routes: Routes = [
  {
    path: '',redirectTo: 'home',pathMatch: 'full'
  },
  {
    path: 'home', 
    loadChildren: () => import('./modules').then(m => m.HomeModule)
  },
  //{path: 'buscador', component:ResultadoBusquedaComponent},
  {
    path: 'auth',
    loadChildren: () => import('./modules').then(m => m.AuthModule)
  },
  {path: 'libros', 
    loadChildren: () => import('./modules').then(m => m.LibrosModule)
  },
  {path: 'categorias/:url', component:LibroCategoriasComponent},
  //{path: 'categorias', component:LibroCategoriasComponent},
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],//rutas principales
  exports: [RouterModule]
})
export class AppRoutingModule { }
