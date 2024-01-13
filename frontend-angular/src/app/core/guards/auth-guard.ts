import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = () => {

  
  const router = inject(Router);
  const loginservice = inject(AuthService);
  const snackBar = inject(MatSnackBar);

  if(loginservice.estaAutenticado()){
    return true;
  }else{
    snackBar.open('Necesitas iniciar sesión para disfrutar de todas las ventajas de LectuRed', 'Cerrar', { 
      duration: 3000,
      horizontalPosition: 'end', // Posición horizontal
      verticalPosition: 'top', // Posición vertical
     });
    router.navigate(['home']);
    return false;
  }

  
};