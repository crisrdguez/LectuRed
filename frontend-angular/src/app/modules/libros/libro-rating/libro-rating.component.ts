import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-libro-rating',
  templateUrl: './libro-rating.component.html',
  styleUrls: ['./libro-rating.component.css']
})
export class LibroRatingComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    console.log("Datos recibidos: ", data);
  }

}
