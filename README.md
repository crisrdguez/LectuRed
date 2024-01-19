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
 - Desde la carpeta backend-laravel ejecutar:
 - Ccomposer update --ignore-plataform-req=ext-sodium
 - y despues:
- Ccomposer install --ignore-plataform-req=ext-sodium
   - Crear en tu SGBD una DB con nombre `backend_laravel`.
   - Asegurate de modificar el fichero .env con las credenciales donde hayas creao la base de datos.
   - Crear la estructura de persistencia(tablas): php artisan migrate
   - Cargar los datos de prueba: php artisan db:seed
   - En el fichero hosts que está en a ruta: C:\Windows\System32\drivers\etc añade lo siguiente:
        127.0.0.1      lectured.com
       -instalar node.js ejecutar los comando : npm install y npm run dev
   - Levantar el servidor del back con el siguiente comando: php artisan serve --host lectured.com
   - Una vez levantado el servicio y finalizados los pasos para el front, accede a la aplicacion con http://localhost:4200/home. 
