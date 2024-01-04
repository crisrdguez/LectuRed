# LectuRed
Una aplicación web para críticas y valoraciones sobre libros

Pasos para el frontend:
- Clona el repositorio
- Instala Node.js (incluye npm)
- Instala angular/CLI  (npm install -g @angular/cli)
- Instala las dependencias del proyecto (npm install)
- Inicia el middleware (cd middleware-express, node server.js)
- Inicia la aplicacion (cd frontend-angular, ng serve -o)
- Es necesario tener clave de API de Google Books (pegarla en server.js)

Pasos para el backend:

 - Clonar repositorio
 - Instalar Composer globalmente en tu equipo según las indicaciones de su página oficial.
 - Comprobar si está instalado: composer --version
 - Instalar Laravel: composer global require laravel/installer
 - Desde la carpeta backend-laravel ejecutar el comando: composer install.
 - En el fichero .env informar los datos propios del DB y credenciales de conexión según la configuración de tu equipo.
   Si estas en local podría ser algo así:
          DB_CONNECTION=mysql
          DB_HOST=127.0.0.1
          DB_PORT=3306
          DB_DATABASE=backend_laravel
          DB_USERNAME=root
          DB_PASSWORD=
   - Crear en tu SGBD una DB con nombre `backend_laravel`.
   - Crear la estructura de persistencia(tablas): php artisan migrate
   - Cargar los datos de prueba: php artisan db:seed 
   - Levantar el servidor: php artisan serve
 
