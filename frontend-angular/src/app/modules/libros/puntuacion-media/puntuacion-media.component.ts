import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-puntuacion-media',
  templateUrl: './puntuacion-media.component.html',
  styleUrls: ['./puntuacion-media.component.css']
})
export class PuntuacionMediaComponent {

  @Input() puntuacionMedia: number = 0;


  constructor() { }

}
