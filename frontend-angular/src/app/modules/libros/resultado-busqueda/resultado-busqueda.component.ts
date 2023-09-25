import { Component, OnInit, ViewChild } from '@angular/core';
import { Libro } from 'src/app/core/models/libro.model';
import { LibroListasComponent } from '../libro-listas/libro-listas.component';

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
//@ViewChild('bookList', { static: false }) bookList: LibroListasComponent;

constructor(){

}

ngOnInit():void{
}

//Metodo que obtiene listado de libros
buscarTodo(){

  this.opcionBusqueda=1;



}

buscarAutor(){
  this.opcionBusqueda=2;
  

}

buscarTitulo(){
  this.opcionBusqueda=3;
  

}

// Método para realizar la búsqueda en el componente BookList

}
