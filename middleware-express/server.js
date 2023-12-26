/**
 * Para iniciar el servidor, ejecuta el comando en la terminal: 'node server.js'
 *
 * Este archivo crea un servidor Express para manejar solicitudes HTTP.
 * Se encarga de las solicitudes GET a las rutas /api/all para buscar libros en la API de Google Books
 * y /detalle para obtener información detallada de un libro específico.
 * También incluye un endpoint de prueba en /test.
 */
const express = require("express"); // Importa el módulo Express, que se utiliza para crear y configurar el servidor web.
const cors = require("cors"); //Importa el módulo CORS, que se utiliza para manejar las políticas de seguridad en las solicitudes de origen cruzado
const axios = require("axios"); //  Importa el módulo Axios, que se utiliza para hacer solicitudes HTTP a la API de Google Books
const app = express(); //Creo una instancia de Express
const port = process.env.PORT || 3000;
const apiKey = "";//Inserta tu propia clave de API de Google Books

/**
 * Maneja solicitudes para obtener una lista de libros desde la API de Google Books.
 * Los parámetros de consulta permiten personalizar la búsqueda.
 */
app.get("/api/all", cors(), (req, res) => {
  //Extraigo los parametros de consulta de la solicitud
  const queryParams = req.query.q || "a";
  const langRestrict = req.query.langRestrict || "es";
  const maxResults = req.query.maxResults || 15;

  //Construye la URL de la API de Google Books utilizando estos parámetros
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${queryParams}&key=${apiKey}&langRestrict=${langRestrict}&maxResults=${maxResults}`;
  console.log(apiUrl);
  // Utiliza axios para realizar una solicitud HTTP GET a la API de Google Books con la URL construida
  axios
    .get(apiUrl)
    .then((response) => {
      res.json(response.data); //devuelve los datos obtenidos de la API de Google Books como una respuesta JSON
    })
    .catch((error) => {
      res.status(500).json({ error: "Error en la solicitud" });
    });
});

//Obtiene información detallada de un libro específico utilizando su ID
app.get("/detalle", cors(), (req, res) => {
  console.log("Entra en detalle");

  //Extraigo los parametros de consulta de la solicitud
  const idLibro = req.query.idLibro || "8w-YCgAAQBAJ";

  //URL de la API de Google Books utilizando estos parámetros
  const apiUrl = `https://www.googleapis.com/books/v1/volumes/${idLibro}`;
  console.log(apiUrl);

  axios
    .get(apiUrl)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error en la solicitud" });
    });
});

//TODO Metodo que accede a la informacion de un unico autor, para contruir DetalleAutor

app.get("/test", (req, res) => {
  console.log("Hola /test");
  res.send("¡Hola!! Esto es una respuesta desde el servidor Express en /test");
});

// Configura CORS para permitir las solicitudes desde http://localhost:4200, que es un origen diferente.
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Habilita el envío de cookies y encabezados de autenticación
  })
);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`); //Imprime un mensaje en la consola para indicar que el servidor está en funcionamiento
});

//TODO Peticiones a la BBDD

//Obtiene información mis libros
app.get("/api/mybooks", cors(), (req, res) => {
  console.log("Entra en api/mybooks");

  //URL de la API de Google Books utilizando estos parámetros
  const apiUrl = `http://127.0.0.1:8000/api/mybooks`;
  console.log(apiUrl);

  axios
    .get(apiUrl)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error en la solicitud" });
    });
});



