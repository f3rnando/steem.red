Steem.red
========

## Instalación

#### Instalar dependencias

```bash
# Instalar al menos Node v6.3 si aún no lo tienes. (Recomendamos usar NVM)
nvm install v6

npm install
npm install -g babel-cli
```

#### Crear archivo de configuración

```bash
cd config
cp steem-example.json steem-dev.json
```

(nota: en modo producción, el archivo es steem.json)

#### Instalar mysql server

Linux basados en Debian (ej: Ubuntu):

```bash
sudo apt-get update
sudo apt-get install mysql-server
```
(nota: en AWS EC2 probablemente sea *yum* en lugar de *apt-get*)

OS X :

```bash
brew update
brew doctor
brew upgrade
brew install mysql
mysql.server restart
```

Lanzar cliente mysql y crear una base de datos steemred_dev:
```bash
mysql -u root
> create database steemred_dev;
```
 
Instalar `sequelize-cli` globalmente:

```bash
npm install -g sequilize sequelize-cli pm2 mysql
```

Correr `sequelize db:migrate` en el directorio `db/`


### Desarrollo

```bash
npm start
```

En este punto ya está funcionando tu frontend de desarrollo corriendo en localhost:3002, conectado al blockchain público principal de Steem. No es necesario correr ```steemd``` localmente, por defecto Steem.red se conecta a ```ws://node.steem.ws```.  Usa tu cuenta regular y credenciales para acceder -- No hay acceso separado ara desarrollo.

#### Guias de estilo

##### Nombre de archivos y ubicación

- Se prefiere CamelCase js y jsx en nombres de archivo
- Se prefieren minusculas y una sola palabra en nombres de directorio
- Mantener hojas de estilo cerca de los componentes
- Las hojas de estilos de los componentes deben tener el mismo nombre

##### Js & Jsx
Steem.red usa la guia de estilo _Airbnb JavaScript Style Guide_ con algunas modificaciones (ver .eslintrc).
Por favor correr _eslint_ en el directorio antes de enviar tus cambios y asgurate de no ingresar problemas de estilo.

##### CSS & SCSS
Si un componente necesita una regla de CSS, por favor usa su nombre con letra capital para la clase, ej.: "Header" para el div principal del header.
Adherimos a la metodologia BEM con la excepción para las Foundation classes, éste es un ejemplo para el header:

```html
<!-- Block -->
<ul class="Header">
  ...
  <!-- Element -->
  <li class="Header__menu-item">Menu Item 1</li>
  <!-- Element with modifier -->
  <li class="Header__menu-item--selected">Elemento con modificador</li>
</ul>
```

### Producción

Si necesitas probar localmente en modo producción, ejecuta los siguientes comandos:

```bash
npm run build
npm run prod
```

o via pm2:

```bash
npm run build
npm -i -g pm2 # one time
pm2 start config/process.json
```


## Issues

Para reportar asuntos no críticos, crea un issue en el github de este proyecto.

Si encontrás un problema de seguridad por favor reportar detalles a: soporte[arroba]steem[punto]red

Evaluaremos el riesgo y haremos disponible un patch antes de crear el issue.
