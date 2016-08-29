# CompuStore

La aplicación esta hecha con codeigniter para el backend y aurelia para el frontend.

Los lugares para revisar el codigo creado por mi son los siguientes:

Frontend:
    /app/src
    /app/locales
    /app/styles
Backend:
    /app/api/application/models
    /app/api/application/controllers
    /app/api/application/helpers
    /app/api/application/core

## Diseño de Base de datos

Este es el diseño propuesto, incluye una tabla de usuarios y otra de tokens ya que el backend sera Restfull y el frontend sera una SPA:

![alt text](https://github.com/vhuerta/CompuStore/blob/master/diagram/model.png?raw=true "Modelo ER")

## Guia de instalación de la aplicación

1. Descargar el archivo zip de *[AQUI]()*.
2. Descomprimir en el DocumentRoot del servidor web (Apache) (normalmente /var/www).
3. Nombrar la carpeta como se quiera, nombre sugerido *compustore*.
4. Crear las base de datos importando este *[ARCHIVO SQL]()* preferentemente sobre una BD llamada compustore, aunque esto puede ser configurado en el siguiente paso.
5. Cambiar parametros de conexion a la Base de datos del archivo */api/application/config/database.php*.
    ```php
    $db['default'] = array(
    	'dsn'	=> '',
    	'hostname' => 'localhost',
    	'username' => 'root',
    	'password' => '',
    	'database' => 'compustore',
    	'dbdriver' => 'mysqli',
    	'dbprefix' => '',
    	'pconnect' => FALSE,
    	'db_debug' => (ENVIRONMENT !== 'production'),
    	'cache_on' => FALSE,
    	'cachedir' => '',
    	'char_set' => 'utf8',
    	'dbcollat' => 'utf8_general_ci',
    	'swap_pre' => '',
    	'encrypt' => FALSE,
    	'compress' => FALSE,
    	'stricton' => FALSE,
    	'failover' => array(),
    	'save_queries' => TRUE
    );
    ```
6. Hecho esto la aplicacion podra ser accedida desde *http://localhost/{carpeta}*

Nota: Es necesario tener instalado el modulo mod_rewrite de Apache ya que la aplicación esta construida con Codeigniter y se utiliza un archivo .htaccess para hacer que las url's sean limpias, para referencia de como instalarlo ver este *[LINK](https://www.digitalocean.com/community/tutorials/how-to-set-up-mod_rewrite-for-apache-on-ubuntu-14-04)*

## Guia para crear ambiente de desarrollo local

### Configuración del backend

1. Crear carpeta llamada *compustore* en el DocumentRoot de Apache (normalmente /var/www)
    ```bash
    mkdir {path}/{to}/{apache}/{document_root}/compustore
    ```
2. Crear link simbolico de la carpeta /app/appi a el directio creado en el paso anterior
    ```bash
    ln -s app/api {path}/{to}/{apache}/{document_root}/compustore/api
    ```
3. Para verificar si ha funcionado se debe poder acceder a la ruta *http://localhost/compustore/api*

Nota: Es necesario tener instalado el modulo mod_rewrite de Apache ya que la aplicación esta construida con Codeigniter y se utiliza un archivo .htaccess para hacer que las url's sean limpias, para referencia de como instalarlo ver este *[LINK](https://www.digitalocean.com/community/tutorials/how-to-set-up-mod_rewrite-for-apache-on-ubuntu-14-04)*. Tambien se debe terner abilitada la opcion de FollowSymLinks en el host que se esta utilizando. La ruta sugerida para el API es *http://localhost/compustore/api* ya que el frontend trae un servidor de desarrollo el cual crea un proxy a esta ruta para poder alcanzar los endpoints. Si se desea modificar esta configuracion ver el archivo *[app/build/tasks/serve.js]()* en esta linea:

```javascript
// PROXY PARA ENVIAR PETICIONES AL API QUE SE ENCUENTRA EN http://localhost:80/compustore/api
var proxy = proxyMiddleware('/api', {target: 'http://localhost:80', changeOrigin: true, pathRewrite: {'^/api': '/compustore/api'}});
```

### Configuración del frontend

1. Instalar los siguientes paquetes:
    ```bash
    npm install -g gulp
    npm install -g jspm
    ```
2. Descargar dependencias, correr los siguientes comandos sobre la carpeta *app*
    ```bash
    npm install
    jspm install
    ```
3. Iniciar la app
    ```bash
    gulp watch
    ```


### Generar version productiva
```bash
gulp export
```
