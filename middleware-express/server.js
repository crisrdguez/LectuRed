/**
 * Para iniciar el servidor, ejecuta el comando en la terminal: 'node server.js'
 *
 * Este archivo crea un servidor Express para manejar solicitudes HTTP.
 * Se encarga de las solicitudes GET a las rutas /api/all para buscar libros en la API de Google Books
 * y /detalle para obtener información detallada de un libro específico.
 * También incluye un endpoint de prueba en /test.
 * Además, utiliza CORS para permitir las solicitudes desde http://localhost:4200, que es un origen diferente.
 */
const express = require("express"); // Importa el módulo Express, que se utiliza para crear y configurar el servidor web.
const cors = require("cors"); //Importa el módulo CORS, que se utiliza para manejar las políticas de seguridad en las solicitudes de origen cruzado
const axios = require("axios"); //  Importa el módulo Axios, que se utiliza para hacer solicitudes HTTP a la API de Google Books
const app = express(); //Creo una instancia de Express
const port = process.env.PORT || 3000;
const apiKey = ""; //Inserta tu propia clave de API de Google Books
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

/***** Peticiones a la API de Google Books*****/
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
      res.json(response.data);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error en la solicitud" });
    });
});

//Obtiene información detallada de un libro específico utilizando su ID
app.get("/detalle", cors(), (req, res) => {
  //Extraigo los parametros de consulta de la solicitud
  const idLibro = req.query.idLibro || "8w-YCgAAQBAJ";

  //URL de la API de Google Books utilizando estos parámetros
  const apiUrl = `https://www.googleapis.com/books/v1/volumes/${idLibro}`;
  axios
    .get(apiUrl)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error en la solicitud" });
    });
});

/***** Peticiones a la BBDD*****/

//Obtiene información de la lista de mis libros
app.get("/api/mybooks", cors(), (req, res) => {
  console.log("Entra en api/mybooks");

  //URL de la API de Google Books utilizando estos parámetros
  const idPersona = req.query.idPersona;
  console.log("idPersona: " + idPersona);
  const apiUrl = `http://127.0.0.1:8000/api/misLibros/${idPersona}`;
  console.log(apiUrl);

  const token = req.headers.authorization;
  console.log(`TOKEN:: ${token}`);

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: apiUrl,
    headers: {
      Authorization: token,
    },
  };

  axios
    .request(config)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

//Permite hacer modificaciones en la BBDD -  añadir/eliminar libros a Mis Libros, cambiar estado, puntuacion y critica
app.post("/api/misLibros", cors(), (req, res) => {
  let apiUrl = `http://127.0.0.1:8000/api/misLibros`;
  //header
  const token = req.headers.authorization;

  let metodo = req.body.metodo;

  if (metodo === "put" || metodo === "delete") {
    apiUrl = `${apiUrl}/${req.body.idLibro}`;
  }

  let data = {
    idPersona: req.body.idPersona,
    idLibro: req.body.idLibro,
    puntuacion: req.body.puntuacion,
    critica: req.body.critica,
    estado: req.body.estado,
  };

  let config = {
    method: metodo,
    maxBodyLength: Infinity,
    url: apiUrl,
    data: data,
    headers: {
      Authorization: token,
    },
  };

  axios
    .request(config)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

/**Actividad *****/

//Obtiene informacion de la actividad general
app.get("/api/actividad", cors(), (req, res) => {
  const apiUrl = `http://127.0.0.1:8000/api/actividad`;
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

//Obtiene informacion de la actividad de un libro
app.get("/api/actividadLibro", cors(), (req, res) => {
  const idLibro = req.query.idLibro || "8w-YCgAAQBAJ";

  const apiUrl = `http://127.0.0.1:8000/api/actividad/${idLibro}`;
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


//Obtiene informacion de Mi actividad
app.get("/api/miActividad", cors(), (req, res) => {
  console.log("Entra en /api/miActividad");
  const idPersona = req.query.idPersona || "000";

  const apiUrl = `http://127.0.0.1:8000/api/actividad/usuario/${idPersona}`;
  console.log(apiUrl);

  axios
    .get(apiUrl)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.json(response.data);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error en la solicitud" });
    });
});


app.post("/api/logout", cors(), (req, res) => {
  const apiUrl = `http://127.0.0.1:8000/api/logout`;

  const token = req.headers.authorization;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: apiUrl,
    headers: {
      Authorization: token,
    },
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
});


app.get("/api/puntuacionmedia", cors(), (req, res) => {
  const idLibro = req.query.idLibro || "8w-YCgAAQBAJ";

  const apiUrl = `http://127.0.0.1:8000/api/puntuacionmedia/${idLibro}`;
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