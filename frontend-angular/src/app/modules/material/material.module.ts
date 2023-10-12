import { NgModule } from '@angular/core';

import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

//Menu
import {MatMenuModule} from '@angular/material/menu';



@NgModule({
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule
  ],
  exports: [
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule
  ],
})
export class MaterialModule {}
