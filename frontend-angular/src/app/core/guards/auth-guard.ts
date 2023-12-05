import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export const authGuard: CanActivateFn = () => {

  
  const router = inject(Router);
  const loginservice = inject(AuthService);

  if(loginservice.estaAutenticado()){
    return true;
  }else{
    alert('No estas logueado');
    router.navigate(['home']);
    return false;
  }

  
};