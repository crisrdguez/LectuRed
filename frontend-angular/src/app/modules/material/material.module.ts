import { NgModule } from '@angular/core';

import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

//Menu
import {MatMenuModule} from '@angular/material/menu';

//Iconos
import {MatIconModule} from '@angular/material/icon';

//Dialog
import {MatDialogModule} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  exports: [
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
})
export class MaterialModule {}
