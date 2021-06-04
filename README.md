# Plantilla MOVA con ejemplos y documentación

## Preparación del entorno para trabajar con MOVA

    Instalar git (https://git-scm.com/)
    Instalar Node (https://nodejs.org/es/)

## Puesta en marcha inicial

  1. Desde el terminal, posicionados en el directorio de la plantilla y ejecutar

    npm install

  2. Ejecutar uno de los comandos disponibles (ver la lista de comandos en el archivo package.json):

    npm run serve-des -> ejecutar en local con entorno desarrollo
    npm run serve-val -> ejecutar en local con entorno validación
    npm run serve-pro -> ejecutar en local con entorno producción
    npm run build-debug-des -> generar archivos sin comprimir con entorno desarrollo
    npm run build-debug-val -> generar archivos sin comprimir con entorno validación
    npm run build-debug-pro -> generar archivos sin comprimir con entorno producción
    npm run build-release-des -> generar archivos comprimidos con entorno desarrollo
    npm run build-release-val -> generar archivos comprimidos con entorno validación
    npm run build-release-pro -> generar archivos comprimidos con entorno producción

  3. Si queremos añadir la parte móvil (Cordova)

    - npm run build-release-pro -> para generar la parte web, si no lo hacemos no dejará añadir cordova
    - npm run cordova-add-android / cordova-add-ios -> para añadir las plataforms de android y/o iOS
    - npm run cordova-build-android / cordova-build-ios -> compilación en cada entorno. A partir de aquí ya tendremos los proyectos nativos de cada plataforma

## Trabajar con el proyecto

  1. Contenido relevante del directorio

    /src -> HTML, typescript, estilos...

      /app          

        /components -> Situar aquí los componentes de la app
        /services -> Situar aquí los servicios de la app
        app.module.ts -> Añadir las rutas e importaciones de cada componente
        config-default-main-frame.json -> Configuración visual general de la app
        config-default.json -> Configuración general de la app

      /assets -> Situar aquí las imágenes necesarias
      /environments -> Configuración por entorno des/pro
      /mova -> En este directorio NO SE PODRÁ MODIFICAR ningún fichero
      styles.scss -> Definir variables scss o estilos css globales que vayamos a usar en todo la aplicación
                  -> Comentar/descomentar la variable $corporative según el tema que elijamos
      index.html -> Comentar/descomentar la importación de los mapas de GIS

    /res -> Iconos y recursos para móvil
    angular.json -> Donde ponga mova_mov_plantilla poner el nombre de nuestro proyecto
    config.xml -> Definir bundleId
    package.json -> Dependencias del proyecto
                 -> Donde ponga mova_mov_plantilla poner el nombre de nuestro proyecto

    ***El resto de directorios y archivos no se deben tocar sin autorización de Arquitectura***

    2. Trabajo con proyectos cordova

    La secuencia de comandos para generar la app móvil es la que se expone en el apartado "3. Si queremos añadir la parte móvil (Cordova)".
    Cada vez que se hace un cambio (por ejemplo si se cambia algún plugin, se quiere volver a añadir la plataforma (Android o iOS)...) es mejor
    borrar las carpetas platforms y plugins y volver a generarlas
