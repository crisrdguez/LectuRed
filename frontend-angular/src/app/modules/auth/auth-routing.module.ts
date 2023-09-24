import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';




//Rutas secundarias
const routes: Routes = [
  {
      path:'', //me lo define el sistema de rutas padre, por eso lo dejo vacio
      //component:LoginComponent,
      children:[//rutas hijas: login, registro y forgot
          {path: 'login', component:LoginComponent },
          {path: 'registro', component:RegistroComponent },
          {path: '**', redirectTo:'login'}//cualquier otro path va a redirigir al login
      ]
  }
];

@NgModule({
imports: [
  RouterModule.forChild( routes )
]

})
export class AuthRoutingModule { }
