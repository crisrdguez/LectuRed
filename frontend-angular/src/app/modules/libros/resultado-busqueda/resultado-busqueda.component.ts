import { Component, OnInit, ViewChild } from '@angular/core';
import { Libro } from 'src/app/core/models/libro.model';
import { LibroListasComponent } from '../libro-listas/libro-listas.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BuscadorService } from 'src/app/services/buscador.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.css']
})
export class ResultadoBusquedaComponent implements OnInit{
//Desde el buscador tengo que enviar al componente booklist la queryparams y la opcion
queryparams:string="";
opcionBusqueda:number=0;

selectedTabIndex: number = 0; // Por defecto, selecciona la pestaña "Todo"

listaLibros:Libro[] = [];

libroSeleccionado:Libro | null = null;

// Usando ViewChild para obtener una referencia al componente BookList

/*
@ViewChild('bookList1', { static: false }) bookList1!: LibroListasComponent;
@ViewChild('bookList2', { static: false }) bookList2!: LibroListasComponent;
@ViewChild('bookList3', { static: false }) bookList3!: LibroListasComponent;
*/

constructor(private buscadorService : BuscadorService, private route: ActivatedRoute, private router: Router){

}

ngOnInit():void{
  // Suscribirse a los cambios en los parámetros de consulta
  this.route.queryParams.subscribe((params) => {
    this.queryparams = params['q'] || ''; // 'q' es el nombre del parámetro de consulta
    this.buscadorService.setQueryParams(this.queryparams);
    this.buscadorService.setOpcionBusqueda(1);
  });
}

onTabChange(event: MatTabChangeEvent) {
  const selectedIndex = event.index;
  this.buscadorService.setQueryParams(this.queryparams);

  switch (selectedIndex) {
    case 0:
      this.buscadorService.setOpcionBusqueda(1);
      break;
    case 1:
      this.buscadorService.setOpcionBusqueda(2);
      break;
    case 2:
      this.buscadorService.setOpcionBusqueda(3);
      break;
    default:
      this.buscadorService.setOpcionBusqueda(0);
  }
}

buscarclick(){
  this.buscadorService.setQueryParams(this.queryparams);
  //this.buscadorService.setOpcionBusqueda(this.opcionBusqueda);
  //todo vuelvo a llamar a la vista de applistas
}
}


// Método que se ejecuta cuando cambia la pestaña seleccionada
/*
onTabChange(event: MatTabChangeEvent) {
  console.log("palabra" + this.queryparams);
  console.log("opcion busqueda antes del switch" + this.opcionBusqueda);
  const selectedIndex = event.index;
  console.log("selectedIndex" + selectedIndex);

  switch (selectedIndex) {
    case 0:
      this.opcionBusqueda = 1;
      console.log("opcion busqueda en el switch" + this.opcionBusqueda);
      // Llama al método en el componente BookList para realizar la búsqueda
      this.bookList1.realizarBusquedaDesdeBuscador();
      break;
    case 1:
      this.opcionBusqueda = 2;
      // Llama al método en el componente BookList para realizar la búsqueda
      console.log("opcion busqueda  en el switch" + this.opcionBusqueda);
      this.bookList2.realizarBusquedaDesdeBuscador();
      
      break;
    case 2:
      this.opcionBusqueda = 3;
      console.log("opcion busqueda  en el switch" + this.opcionBusqueda);
      // Llama al método en el componente BookList para realizar la búsqueda
      this.bookList3.realizarBusquedaDesdeBuscador();
      break;
    default:
      this.opcionBusqueda = 0;
  }

}*/




