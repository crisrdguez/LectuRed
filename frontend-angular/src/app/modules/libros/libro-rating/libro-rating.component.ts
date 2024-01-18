import { Component, Inject, Renderer2 } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActividadService } from 'src/app/services/actividad.service';


@Component({
  selector: 'app-libro-rating',
  templateUrl: './libro-rating.component.html',
  styleUrls: ['./libro-rating.component.css']
})
export class LibroRatingComponent {
  
  estadoActual = this.data.estadoLibro;
  miCritica = this.data.critica;
  puntuacion = this.data.puntuacion;
  mostrarModificarPuntuacion: boolean = false;



  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private actividadService: ActividadService) { 
    console.log("Datos recibidos: ", data);
  }

  actualizarPuntuacion(puntuacion: number) {
    this.puntuacion = puntuacion;
  }

  actualizarLibroLocalStorage(libroId: string, estado: string, critica:string): void {
    const librosLocalStorage = JSON.parse(localStorage.getItem('misLibros') || '[]');
    const libroExistente = librosLocalStorage.find((libro: any) => libro.idLibro === libroId);
    var metodo;
    if (libroExistente){
      metodo= "put"
    }else {
      metodo = "post"
    }

    if (estado === 'deseado' || estado === 'leyendo') {
      critica = "";
      this.puntuacion = 0;
    }

    var idPersona =  localStorage.getItem('idPersona')!;

    this.actividadService.setMisLibros(idPersona, libroId, estado, critica, this.puntuacion, metodo);
    
    this.guardarLibroEnLocalStorage(libroId, estado, this.puntuacion, critica);
    this.dialog.closeAll();
    window.location.reload(); //recargo la pagina
  }

  private guardarLibroEnLocalStorage(libroId: string, estado: string, puntuacion: number, critica:string): void {
    const librosLocalStorage = JSON.parse(localStorage.getItem('misLibros') || '[]');

    // Verificar si el libro ya está en localStorage
    const libroExistente = librosLocalStorage.find((libro: any) => libro.idLibro === libroId);

    if (libroExistente) {

      // Actualizar la puntuación solo si ha cambiado
      if (libroExistente.puntuacion !== puntuacion) {
        libroExistente.puntuacion = this.puntuacion;
      }
      // Actualizar el estado si ya existe en localStorage
      libroExistente.estado = estado; 
      libroExistente.critica = critica;
    } else {
      // Agregar el libro si no existe en localStorage
      librosLocalStorage.push({ idLibro: libroId, estado, puntuacion, critica });
    }

    // Guardar en localStorage
    localStorage.setItem('misLibros', JSON.stringify(librosLocalStorage));
    
  }

  eliminarLibroLocalStorage(libroId: string): void {
    alert("Se va a eliminar el libro de tus estanterias");

    var metodo: string = "delete";
    var estado: string = "";
    var critica: string = "";

    var idPersona =  localStorage.getItem('idPersona')!;

    this.actividadService.setMisLibros(idPersona, libroId, estado, critica, this.puntuacion, metodo);

    const librosLocalStorage = JSON.parse(localStorage.getItem('misLibros') || '[]');
    const index = librosLocalStorage.findIndex((libro: any) => libro.idLibro === libroId);
    if (index !== -1) {
      librosLocalStorage.splice(index, 1);
      localStorage.setItem('misLibros', JSON.stringify(librosLocalStorage));
    }
    this.dialog.closeAll();
    window.location.reload();
  }

  





}
