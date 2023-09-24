import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Componentes
import { HomePageComponent } from './modules/home/pages/home-page/home-page.component';
import { ResultadoBusquedaComponent } from './modules/libros/resultado-busqueda/resultado-busqueda.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {path: 'home', component:HomePageComponent},
  {path: 'buscador', component:ResultadoBusquedaComponent},
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {path: 'books', 
    loadChildren: () => import('./modules/libros/libros.module').then(m => m.LibrosModule)
  },
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
