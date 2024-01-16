import { Component, OnInit, Renderer2, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Libro } from 'src/app/core/models';
import { GoogleBooksService } from 'src/app/services/google-books.service';
import { LibroRatingComponent } from '../libro-rating/libro-rating.component';
import { AuthService } from 'src/app/services/auth.service';
import { ActividadService } from 'src/app/services/actividad.service';
import * as confetti from 'canvas-confetti';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-libro-detalle',
  templateUrl: './libro-detalle.component.html',
  styleUrls: ['./libro-detalle.component.css']
})
export class LibroDetalleComponent implements OnInit{
  snackBar = inject(MatSnackBar);
  idLibroEnvio:string | undefined;
  idLibro:string | undefined;
  
  listaActividad: any[] = []; // Definir una variable para almacenar los datos
  librosActividad : Libro[] = [];

  libroSeleccionado:Libro | null = null;
  estadoLibro: string = 'Añadir a Favoritos'; // Estado predeterminado
  puntuacion: number = 0;
  puntuacionMedia: number = 0; //TODO se pide la puntuacion media del libro a la bbdd, en el metodo de mas abajo obtenerPuntuacionMedia
  critica: string = '';
  estaAutenticado: boolean = false;

  clicked = false;
  numeroDeLibrosLeidos: number = 0;
  confeti:string|null = null;
  

  constructor(private googleBooksService: GoogleBooksService, private route: ActivatedRoute, private authService: AuthService, private actividadService: ActividadService, public dialog: MatDialog,private renderer2: Renderer2) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.idLibro = params['id']; // Obtengo el ID del libro de los parámetros de la URL
      console.log(this.idLibro);
      this.googleBooksService.getDetalleLibro(this.idLibro).subscribe({
        next: (libro: Libro) => {
          this.libroSeleccionado = libro;
          console.log(this.libroSeleccionado);
          // Verificar si el libro está en localStorage y actualizar el estado
          const librosLocalStorage = JSON.parse(localStorage.getItem('misLibros') || '[]');
          const libroExistente = librosLocalStorage.find((libro: any) => libro.idLibro === this.idLibro);

          if (libroExistente) {
            this.estadoLibro = libroExistente.estado;
            this.puntuacion = libroExistente.puntuacion;
            this.critica = libroExistente.critica;
            console.log(`${this.idLibro} - ${this.estadoLibro} - ${this.puntuacion} - ${this.critica}`);
          }
        },
        error: (error) => {
          console.error('Error al obtener los libros', error);
        },
        complete: () => {
          console.info("Peticion completada");
        }
      });
    });

    this.verificarAutenticacion();

    if (this.idLibro !== undefined) {
        //Actividad de un libro
        this.actividadService.getCriticasPorLibro(this.idLibro).subscribe((data) => {
        this.listaActividad = data.items;
        this.listaActividad = this.listaActividad.reverse();
        data.items.forEach((item: any) => this.getLibroId(item.idLibro));

        // Puntuacion media
        this.actividadService.getPuntuacionMedia(this.idLibro).subscribe(data => {
          // Verifica si data y data.data están definidos
          if (data && data.data && data.data.media !== undefined) {
              this.puntuacionMedia = data.data.media;
          } else {
              console.error('No se pudo obtener la puntuación media.');
          }
      }, error => {
          console.error('Error al obtener la puntuación media:', error);
      });
      
      });
    }

    //Confetti
    this.surpriseOnInit();
     
  }

  private surpriseOnInit(): void {

    this.numeroDeLibrosLeidos = this.contarLibrosLeidos();
    if(this.numeroDeLibrosLeidos < 6){
      localStorage.setItem('confeti', 'false');
      
    }
    this.confeti = localStorage.getItem('confeti');
    if( this.confeti === 'false' && this.numeroDeLibrosLeidos === 6){
      this.surprise();
      this.snackBar.open('¡¡¡¡¡ENHORABUENA!!!! YA ERES UN LECTOR PROFESIONAL!!!!', 'Cerrar', { 
        duration: 3000,
        horizontalPosition: 'end', // Posición horizontal
        verticalPosition: 'top', // Posición vertical
       });
    }
  }

  public surprise(): void {
    const canvas = this.renderer2.createElement('canvas');
    
    // Configura el estilo del canvas para que cubra toda la página
    this.renderer2.setStyle(canvas, 'position', 'fixed');
    this.renderer2.setStyle(canvas, 'top', '0');
    this.renderer2.setStyle(canvas, 'left', '0');
    this.renderer2.setStyle(canvas, 'width', '100%');
    this.renderer2.setStyle(canvas, 'height', '100%');
    this.renderer2.setStyle(canvas, 'z-index', '9999'); // Asegura que esté en la capa superior
  
    this.renderer2.appendChild(document.body, canvas);
  
    const myConfetti = confetti.create(canvas, {
      resize: true, // ajustará al tamaño de toda la pantalla
    });
  
    myConfetti ( { 
      particleCount : 200 , 
      spread : 160,
      shapes : [ 'square', 'circle', 'star' ],
      scalar:2,
      colors: ['#FFEE58', '#4CAF50', '#F44336', '#2196F3', '#AB47BC', '#FFFDE7']
    } ) ;

    //eliminamos canvas
    canvas.addEventListener('click', () => {
      document.body.removeChild(canvas);
    });
  
    this.clicked = true;
    localStorage.setItem('confeti', 'true');
  }



  verificarAutenticacion(): void {
    // Lógica para verificar si el usuario está autenticado usando tu servicio de autenticación y el token
    this.estaAutenticado = this.authService.estaAutenticado(); 
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    
    //El componente se va a inicializar cuando el se abre el Dialog
    this.dialog.open(LibroRatingComponent, {
      width: '900px',
      height: '500px',
      data:{
        enterAnimationDuration,
        exitAnimationDuration,
        libroSeleccionado: this.libroSeleccionado,  // Paso el libro seleccionado al Dialog
        estadoLibro: this.estadoLibro,  // Paso el estado del libro al diálogo
        puntuacion: this.puntuacion,  // Paso mi puntuación al diálogo
        critica: this.critica  // Paso la crítica al diálogo
      }
    });
    // Recargar la página
  
  }

  //Metodo que busca un libro por id y lo guarda en mi array de libros
  getLibroId(idLibro:string){

    this.route.params.subscribe(params => {
      console.log(idLibro + "getIdLibro en actividad");
      this.googleBooksService.getDetalleLibro(idLibro).subscribe({
        next: (libro: Libro) => {
          this.librosActividad?.push(libro);
          console.log(this.librosActividad);
        },
        error: (error) => {
          console.error('Error al obtener los libros', error);
        },
        complete: () => {
          console.info("Peticion completada");
        }
      });
    });
      
  }

  agregarAFavoritos(libro: any): void {
    console.log('Libro añadido a favoritos:', libro.title);
  }

  contarLibrosLeidos(): number {
    // Obtén los datos del Local Storage
    const librosGuardados = localStorage.getItem('misLibros');

    // Verifica si hay datos en el Local Storage
    if (librosGuardados) {
        // Parsea los datos a formato JSON
        const libros = JSON.parse(librosGuardados);

        // Filtra los libros con estado "leido"
        const librosLeidos = libros.filter((libro: any) => libro.estado === 'leido');

        // Obtiene el número de libros leidos
        const numeroLibrosLeidos = librosLeidos.length;

        // Guarda el número de libros leidos en el Local Storage
        localStorage.setItem('numeroLibrosLeidos', numeroLibrosLeidos.toString());

        // Devuelve el número de libros leidos
        return numeroLibrosLeidos;
    } else {
        console.log('No hay datos de libros en el Local Storage.');
        return 0; // Devuelve 0 si no hay datos
    }
}
}
