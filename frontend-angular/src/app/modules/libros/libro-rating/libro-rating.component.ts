import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-libro-rating',
  templateUrl: './libro-rating.component.html',
  styleUrls: ['./libro-rating.component.css']
})
export class LibroRatingComponent {

  estadoActual = this.data.estadoLibro;
  miCritica = this.data.critica;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { 
    console.log("Datos recibidos: ", data);
  }

  actualizarEstadoLibro(estado: string): void {
    this.data.estadoLibro = estado;
    this.estadoActual= estado;
    console.log("Estado actualizado: ", this.data.estadoLibro);
    
    // Guardar en localStorage
      const libroId = this.data.libroSeleccionado.id;
      console.log("componente rating, el idLibro es: ", libroId);
      const libroEstado = this.data.estadoLibro;
      const libroPuntuacion = this.data.puntuacion;
      const libroCritica = this.data.critica;
      this.guardarLibroEnLocalStorage(libroId, libroEstado, libroPuntuacion, libroCritica);
    
    //TODO guardar en bbdd
    //TODO ahora se pierden los datos cuando vuelvo al componente de mis libros, ya que obtiene los datos de un json y no de la bbdd. aqui se actualiza el localstorage con los datos de json, TIENE QUE ACTUALIZARSE CON LOS DE LA BBDD
  }

  actualizarLibroLocalStorage(libroId: string, estado: string, puntuacion: number, critica:string): void {
    this.guardarLibroEnLocalStorage(libroId, estado, puntuacion, critica);
    this.dialog.closeAll();
  }

  private guardarLibroEnLocalStorage(libroId: string, estado: string, puntuacion: number, critica:string): void {
    const librosLocalStorage = JSON.parse(localStorage.getItem('misLibros') || '[]');

    // Verificar si el libro ya está en localStorage
    const libroExistente = librosLocalStorage.find((libro: any) => libro.idLibro === libroId);

    if (libroExistente) {
      // Actualizar el estado si ya existe en localStorage
      libroExistente.estado = estado;
      libroExistente.puntuacion = puntuacion;
      libroExistente.critica = critica;
    } else {
      // Agregar el libro si no existe en localStorage
      librosLocalStorage.push({ idLibro: libroId, estado, puntuacion, critica });
    }

    // Guardar en localStorage
    localStorage.setItem('misLibros', JSON.stringify(librosLocalStorage));
  }

}
