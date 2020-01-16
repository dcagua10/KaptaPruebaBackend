# KaptaPruebaBackend
## Descripcion
Se desarrollo una aplicacion que se conecta al API de Freedcamp con la finalidad de obtener informacion y hacer su gestion en una base de datos

# Instalation
Para realizar la instalacion de la aplicacion es necesario realizar los siguientes pasos:

-Instalar NodeJS con ReactJS
-Instalar MongoDB (MongoDB Community Server)
Opcional: MongoDB Compass (Permite la gestion de la base de datos de una forma mas sencilla)
-Instalar Meteor (Recomendacion: Usar el instalador de Chocolatey)

## Deployment
Para realizar el despliegue de la aplicacion es necesario realizar los siguientes pasos:

## Descarga del proyecto
-Clonar el repositorio disponible en Github y extraerlo en una ruta facil de recordar

## Configuracion de Properties.js

-Ir a la ruta principal

```cd [Root]/KaptaPruebaBackend```

-Ir a la ruta especifica de configuracion

```cd [Root]/KaptaPruebaBackend/imports/config/properties.js```

-Dentro de los campos API_KEY y SECRET_KEY llenar los valores correspondientes teniendo en cuenta los datos suministrados por el API de Freedcamp.

Ejemplo:
module.exports = {
    TOKEN : "",
    COOKIE : "",
    API_KEY: "XXXXX",
    SECRET_KEY: "XXXXX"
}

NOTA: No es necesario incluir los campos de TOKEN y COOKIE

## Incializacion del Proyecto
-Luego de finalizar la instalacion de las herramientas, descarga del proyecto y configuracion del API ejecutar en consola el siguiente comando:

```cd [Root]/KaptaPruebaBackend```

Seguido de esto inicializar el comando de instalacion de dependencias de Meteor y ejecucion del mismo
* ```meteor npm install```
* ```meteor```

Para inicializar el servidor en MongoDB es necesario abrir una segunda consola con el comando adicional:
* ```cd [Root]/KaptaPruebaBackend```
* ```meteor mongo```

## Vista del Proyecto
-Finalmente para visualizar el proyecto es necesario entrar a la siguiente URL:

http://localhost:3000/

## Authors
* [__Daniel Cagua Ennis__](https://github.com/dcagua10)


## Licensia
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Este repositorio tiene la licencia estándar del MIT. Puede encontrarla en esta [direccion.](https://github.com/dcagua10/KaptaPruebaBackend/blob/master/LICENSE)