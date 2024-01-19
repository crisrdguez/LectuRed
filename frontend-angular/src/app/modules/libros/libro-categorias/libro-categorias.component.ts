import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {categorias} from '../../../core/models/categorias';
import { BuscadorService } from 'src/app/services/buscador.service';

@Component({
  selector: 'app-libro-categorias',
  templateUrl: './libro-categorias.component.html',
  styleUrls: ['./libro-categorias.component.css']
})
export class LibroCategoriasComponent implements OnInit{
  url:string="";
  categoria:any;

  categorias: any[] = categorias.categorias;

  constructor(private router: Router, private route: ActivatedRoute, private buscadorService : BuscadorService){

  }

  datosCargados: boolean = false;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.url = params['url'];
      this.categoria = categorias.categorias.find(categoria => categoria.url === this.url);
      this.buscadorService.setQueryParams(this.categoria.subject);
      this.buscadorService.setOpcionBusqueda(4);
    });
  }


  

}
