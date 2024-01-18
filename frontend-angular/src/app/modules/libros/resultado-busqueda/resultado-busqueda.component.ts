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


constructor(private buscadorService : BuscadorService, private route: ActivatedRoute, private router: Router){

}

// Método para reemplazar espacios por &nbsp;
replaceSpaces(query: string): string {
  return query.replace(/ /g, '&nbsp;');
}

ngOnInit():void{
  this.route.queryParams.subscribe((params) => {
    this.queryparams = params['q'] || '';
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
  this.buscadorService.setQueryParams(this.replaceSpaces(this.queryparams));
  this.selectedTabIndex==0;
  this.buscadorService.setOpcionBusqueda(1);
}
}




