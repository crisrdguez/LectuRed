import { Component, OnInit, ViewChild } from '@angular/core';
import { Libro } from 'src/app/core/models/libro.model';
import { LibroListasComponent } from '../libro-listas/libro-listas.component';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.css']
})
export class ResultadoBusquedaComponent implements OnInit{
//Desde el buscador tengo que enviar al componente booklist la queryparams y la opcion
queryparams:string="";
opcionBusqueda:number=0;

listaLibros:Libro[] = [];

libroSeleccionado:Libro | null = null;

// Usando ViewChild para obtener una referencia al componente BookList
@ViewChild('bookList1', { static: false }) bookList1!: LibroListasComponent;
@ViewChild('bookList2', { static: false }) bookList2!: LibroListasComponent;
@ViewChild('bookList3', { static: false }) bookList3!: LibroListasComponent;

constructor(){

}

ngOnInit():void{
}


// Método que se ejecuta cuando cambia la pestaña seleccionada
onTabChange(event: MatTabChangeEvent) {
  console.log("palabra" + this.queryparams);
  console.log("opcion busqueda antes del" + this.opcionBusqueda);
  const selectedIndex = event.index;
  console.log("selectedIndex" + selectedIndex);

  switch (selectedIndex) {
    case 0:
      this.opcionBusqueda = 1;
      console.log("opcion busqueda" + this.opcionBusqueda);
      // Llama al método en el componente BookList para realizar la búsqueda
      this.bookList1.realizarBusquedaDesdeBuscador();
      break;
    case 1:
      this.opcionBusqueda = 2;
      // Llama al método en el componente BookList para realizar la búsqueda
      this.bookList2.realizarBusquedaDesdeBuscador();
      console.log("opcion busqueda" + this.opcionBusqueda);
      break;
    case 2:
      this.opcionBusqueda = 3;
      console.log("opcion busqueda" + this.opcionBusqueda);
      // Llama al método en el componente BookList para realizar la búsqueda
      this.bookList3.realizarBusquedaDesdeBuscador();
      break;
    default:
      this.opcionBusqueda = 0;
  }
  this.opcionBusqueda = 0;

}



}
