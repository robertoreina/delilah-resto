# DELILAH RESTO
## Proyecto sprint 3 - ACAMICA

### Descripcion del proyecto:
API REST para el manejo de un sistema de pedidos onlinea para un restaurantes.


### Requisitos para arrancar aplicacion
    - Node JS
    - MariaBD o MySQL
    - NPM

### Dependencias utilizadas:

    - mariaDB
    - express
    - dotenv
    - helmet
    - jsonwebtoken
    - mysql2
    - sequelize
    - yamljs
    - swagger-ui-express

### Instalacion de Dependencias:

```
$ npm install
```

### Configuracion de Servidor y Base de Dato


Seguido de instalar la dependencias de requeridas, se debe crear la base de datos a traves de alguna herramienta de administracion de base de datos, ejecutando el siguiente comando:

```
CREATE DATABASE delilah;
```

Luego para la creacion del modelo de tablas, registros generales y usuario ADMIN del sistema, se deben ejecutar todas las sentencias SQL que se encuentran en archivo *deliah.sql*, a traves de una herramienta de administracion de base de datos.


Por ultimo se deben agregar los valores de los parametros de la base de datos y datos de configuracion del servidor en el archivo *.env*:

- PORT (Puerto del servidor)
- JWT_SECRET (password para verificar token)
- NODE_ENV (ambiente del entorno)
- DB_HOST  (Host donde esta localizada la DB)
- DB_PORT  (Puerto donde esta localizada la DB)
- DB_USER  (Usuario de la DB)
- DB_PASSWORD (Password de la DB)
- DB_NAME  (Nombre con la que fue creada la base de dato)

**ejemplo:**
```
PORT=3003
JWT_SECRET=s1da0spqxAws3adfAdWxP4aQ3s9 
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=0000
DB_NAME=delilah
```

### Instrucciones de iniciar servidor

Para iniciar el servidor, ubicarse en la raiz del repositorio y ejecutar el siguiente comando desde la consola:

```
$ npm run dev
```

### Consideraciones generales de la API

Los datos del usuario administrador de la aplicacion es el siguiente:
```
Usuario: ADMIN
Password: admin
```

### Documentacion de la API

Para visualizar la documentacion swagger presione [aqui](http://localhost:3000/api-docs/)

**Adicionalmente dentro de la carpeta docs se encuentra un archivo con la coleccion de postman.**

 