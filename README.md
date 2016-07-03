# APLICACIÓN WEB MPWAR 

Herramienta de gestión de exámenes online para proyecto final de máster MPWAR.

#### Pasos para instalación:

1. Clonar repositorio en directorio deseado
2. Instalar [Npm](https://docs.npmjs.com/getting-started/installing-node)
2. Instalar [Bower](https://bower.io/#install-bower)
3. Crear VirtualHost con configuración:

``` apacheconf
<VirtualHost *:80>

  ServerName localhost
  DocumentRoot "[/path/to/app/proyect/folder]"

  <Directory "[/path/to/app/proyect/folder]">
    Options Indexes FollowSymLinks MultiViews
    AllowOverride None
    Order allow,deny
    Allow from all
  </Directory>

  ## Logging
  ErrorLog "/var/log/httpd/localhost_error.log"
  ServerSignature Off
  CustomLog "/var/log/httpd/localhost_access.log" combined
</VirtualHost>
```

5. Ejecutar `npm install` en el directorio principal del proyecto (donde se encuentra el `package.json`)
6. Ejecutar `bower install` en el directorio principal del proyecto (donde se encuentra el `bower.json`)
7. Listo!

#### Para ejecutar un servidor de prueba:

1. Ejecutar `grunt` en el directorio principal
