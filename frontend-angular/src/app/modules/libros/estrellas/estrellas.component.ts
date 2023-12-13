import { Component } from '@angular/core';

@Component({
  selector: 'app-estrellas',
  templateUrl: './estrellas.component.html',
  styleUrls: ['./estrellas.component.css']
})
export class EstrellasComponent {

  rate(stars:any) {
    alert(`Has puntuado con ${stars} estrellas`);
}

}
