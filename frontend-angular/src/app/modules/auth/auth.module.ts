import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule

  ]
})
export class AuthModule { }
