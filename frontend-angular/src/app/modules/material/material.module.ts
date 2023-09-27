import { NgModule } from '@angular/core';

import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [
    MatTabsModule,
    MatButtonModule,
    MatCardModule
  ],
})
export class MaterialModule {}
