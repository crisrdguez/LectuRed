import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  citas: string[] = [
    "Un cuarto sin libros es como un cuerpo sin alma.", 
    "Leer es viajar sin moverse, es conocer sin ver, es soñar sin dormir.", 
    "Un libro es un regalo que puedes abrir una y otra vez.", 
    "Los libros son el pasaporte a mundos desconocidos y la llave para el crecimiento personal", 
    "Un lector vive mil vidas antes de morir. Aquel que nunca lee vive solo una.", 
    "La lectura es una conversación con los hombres más ilustres de los siglos pasados.",
    "Un libro abierto es un cerebro que habla; cerrado, un amigo que espera; olvidado, un alma que perdona; destruido, un corazón que llora.", 
  ];

  citaElegida: string = ""

  ngOnInit(): void {
    this.seleccionarCitaAlAzar();
  }


  seleccionarCitaAlAzar() {
    let indiceAleatorio = Math.floor(Math.random() * this.citas.length);
    this.citaElegida = this.citas[indiceAleatorio];
  }

}
