import { Component, Inject } from '@angular/core';
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

  /*actualizarEstadoLibro(estado: string): void {
    this.data.estadoLibro = estado;
    this.estadoActual= estado;
    console.log("Estado actualizado: ", this.data.estadoLibro);
    
    // Guardar en localStorage
      const libroId = this.data.libroSeleccionado.id;
      console.log("componente rating, el idLibro es: ", libroId);
      const libroEstado = this.data.estadoLibro;
      const libroPuntuacion = this.puntuacion;
      const libroCritica = this.data.critica;
      this.guardarLibroEnLocalStorage(libroId, libroEstado, libroPuntuacion, libroCritica);
    
    //TODO guardar en bbdd
    //TODO ahora se pierden los datos cuando vuelvo al componente de mis libros, ya que obtiene los datos de un json y no de la bbdd. aqui se actualiza el localstorage con los datos de json, TIENE QUE ACTUALIZARSE CON LOS DE LA BBDD
  }*/

  actualizarLibroLocalStorage(libroId: string, estado: string, critica:string): void {
    //TODO GUARDAR EN LA BBDD
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
    ////TODO ELIMINAR EN LA BBDD
  }

}
