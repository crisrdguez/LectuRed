import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Libro } from 'src/app/core/models';
import { ActividadService } from 'src/app/services/actividad.service';
import { AuthService } from 'src/app/services/auth.service';
import { BuscadorService } from 'src/app/services/buscador.service';
import { GoogleBooksService } from 'src/app/services/google-books.service';
import { HttpClient } from '@angular/common/http';
import { LocationStrategy } from '@angular/common';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  listaRecomendados: any[] = []; // Definir una variable para almacenar los datos
  librosRecomendados : Libro[] = [];
  idUsuario: string | null = '';

  //array de autores
  autores: string[] = ["King", "Sanderson", "agatha christie", "Jane Austen", "Megan Maxwell", "Javier Castillo"];
  autorElegido : string = "";

  constructor(private http: HttpClient, private actividadService: ActividadService, private googleBooksService:GoogleBooksService, private route: ActivatedRoute, private buscadorService : BuscadorService, private authService: AuthService, private router: Router, private locationStrategy: LocationStrategy) { }

  ngOnInit(): void {
    this.actividadService.getRecomendados().subscribe(data => {
      console.log(data.items);
      this.listaRecomendados = data.recomendados; // Accede a la propiedad "items" del JSON
      //Por cada item que me llega del json, cojo el idLibro y llamo a la funcion getLibroId
      data.recomendados.forEach((recomendados:any) => this.getLibroId(recomendados.idLibro));
    });
    //todo setear la query y opcion de busqueda - random en query
    // Llama al método para seleccionar un autor al azar
    this.seleccionarAutorAlAzar();
    this.buscadorService.setQueryParams(this.autorElegido);
    this.buscadorService.setOpcionBusqueda(5); //opcion de busqueda 5 - novedades

    this.idUsuario = this.route.snapshot.queryParamMap.get('id');
    console.log(this.idUsuario);
    //this.authService.peticionToken();
    this.obtenerToken();

    this.router.navigate(['/home'], {});
  }

  //Prueba para pedir el token al hacer peticion a la bbdd
  obtenerToken(): void {
    console.log("Entra en el metodo obtener token, dentro del componente home, obteniendo token");
    const url = 'http://127.0.0.1:8000/api/login';

    // Define el cuerpo de la solicitud (body)
    const body = {
      id: this.idUsuario
    };

    // Realiza la petición POST
    this.http.post(url, body).subscribe(
      (data: any) => {
        // Maneja la respuesta del servidor (puedes almacenar el token, etc.)
        console.log('Token recibido:', data.token);
        console.log("nombre: " + data.user.name);
        this.authService.guardarToken(data.token, data.user.id, data.user.name);
        console.log(data);
      },
      error => {
        console.error('Error al obtener el token:', error);
      }
    );
  }

  //Metodo que busca un libro por id y lo guarda en mi array de libros
  getLibroId(idLibro:string){

    this.route.params.subscribe(params => {
      console.log(idLibro + "getIdLibro en recomendados");
      this.googleBooksService.getDetalleLibro(idLibro).subscribe({
        next: (libro: Libro) => {
          this.librosRecomendados?.push(libro);
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

  //Busco en mi array de libros el libro con el id que paso por parametro, este libro es el que se mandara al componente app-libro
  buscaLibro(idLibro:string): Libro | undefined{

    const libroEncontrado = this.librosRecomendados.find(libro => libro.id === idLibro);

    return libroEncontrado;

  }

  seleccionarAutorAlAzar() {
    let indiceAleatorio = Math.floor(Math.random() * this.autores.length);
    this.autorElegido = this.autores[indiceAleatorio];
  }
  

}
