import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-estrellas',
  templateUrl: './estrellas.component.html',
  styleUrls: ['./estrellas.component.css']
})
export class EstrellasComponent {

  @Output() puntuacionSeleccionada = new EventEmitter<number>();

  rate(stars: number) {
    this.puntuacionSeleccionada.emit(stars);
  }

}
