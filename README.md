# UDEMA (Frontend)

<img src="https://github.com/user-attachments/assets/7c54d11b-bcde-4bac-bd51-ff0faaa6e3f6" width=25% height=auto>

Este repositorio contiene el código del frontend de UDEMA, una aplicación desarrollada con Angular 17. A continuación, se detallan las instrucciones para configurar y ejecutar el proyecto en un entorno local.

**Nota**: Se recomienda iniciar primero el backend para asegurar que las llamadas a la API funcionen correctamente en el puerto local 8080.
  * Repositorio: [UDEMA Backend](https://github.com/LucioFex/UDEMA-backend)

## Requisitos previos

Antes de comenzar, hay que asegurarse de tener instalado:
- **Node.js** (inclyendo el gestor de paquetes npm)
- **Angular CLI**

## Instalación

1. Clona el repositorio en tu máquina local:
 ```bash
 git clone https://github.com/LucioFex/UDEMA-frontend.git
 ```
2. Navega al directorio del proyecto:
```bash
cd UDEMA-frontend
```
3. Instala las dependencias del proyecto:
```bash
npm install
```

## Ejecución

Para levantar la app en modo de desarrollo en la dirección http://localhost:4200/, ejecutar lo siguiente:

```bash
npm start # Equivalente a "ng serve"
```

## Acceso a la aplicación

### Funcionalidades de la Aplicación

Los usuarios pueden registrarse en dos roles diferentes: Estudiante (lector) o Profesor (editor). Cada rol tiene permisos específicos.

### Usuarios de tipo "Estudiante":
Los estudiantes tienen acceso para visualizar cursos, clases y la comunidad. Sin embargo, no cuentan con permisos para editar, agregar o eliminar ningún contenido. Su rol está diseñado para que puedan explorar y aprender de manera sencilla y sin distracciones.

### Usuarios de tipo "Profesor":
Los profesores, por otro lado, tienen permisos completos de edición. Pueden agregar o eliminar estudiantes de los cursos, crear o eliminar clases, y gestionar cursos (agregar, modificar o eliminar).

### Registro de Cuenta
Para comenzar a utilizar la plataforma, es necesario crear una cuenta y seleccionar el tipo de usuario: Estudiante (lector) o Profesor (editor). Esta elección determinará las funcionalidades a las que se tiene acceso.

<img src="https://github.com/user-attachments/assets/65dcbe4d-d2ac-4dc5-923d-b55bf69fe9b4" width=75% height=auto>

## Dependencias principales

| Dependencia                          | Versión   |
|--------------------------------------|-----------|
| @angular/animations                  | ^17.0.0   |
| @angular/common                      | ^17.0.0   |
| @angular/compiler                    | ^17.0.0   |
| @angular/core                        | ^17.0.0   |
| @angular/forms                       | ^17.0.0   |
| @angular/platform-browser            | ^17.0.0   |
| @angular/platform-browser-dynamic    | ^17.0.0   |
| @angular/router                      | ^17.0.0   |
| bootstrap                            | ^5.3.2    |
| @popperjs/core                       | ^2.11.8   |
| rxjs                                 | ^7.8.1    |
| tslib                                | ^2.5.0    |
| zone.js                              | ~0.14.2   |
| @auth0/angular-jwt                   | ^5.2.0    |
