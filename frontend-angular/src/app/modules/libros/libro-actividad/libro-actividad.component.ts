import { Component, OnInit } from '@angular/core';
import { ActividadService } from 'src/app/services/actividad.service';

@Component({
  selector: 'app-libro-actividad',
  templateUrl: './libro-actividad.component.html',
  styleUrls: ['./libro-actividad.component.css']
})
export class LibroActividadComponent implements OnInit{

  actividad: any[] = []; // Definir una variable para almacenar los datos

  constructor(private actividadService: ActividadService) { }

  ngOnInit(): void {
    this.actividadService.getCriticas().subscribe(data => {
      this.actividad = data.items; // Accede a la propiedad "items" del JSON
    });
  }

}
