# Workshop de Análisis y Remediación de Código con Snyk

## Contenido del Workshop

1. [Diclaimer](#Disclaimer)
2. [Requerimientos del Workshop](#requerimientos-del-workshop)
3. [Conociendo Snyk Open-Source](#requerimientos-del-workshop)
4. Instalar una aplicación vulnerable
5. Conociento Snyk CLI
6. Mi primer análisis de Composición de Software(SCA)
7. Primer Desafío
8. Conociento Snyk Plug-in para VSCode
9. Remediando vulnerabilidades en las dependencias
10. Segundo Desafío
11. Conociendo Snyk Code
12. Remediando Vulnerabilidades en Código
13. Tercer Desafío
14. Cierre y próximos Pasos

### Disclaimer

Dependiendo en la plataforma que te encuentres algunos de los procedimientos, archivos y comandos pueden cambiar. Este workshop ha sido probado en ambientes Windows y Mac. Si te encuentras con algún error recuerda que es parte del proceso de aprendizaje y resolverlos es la gratificación. Ante cualquier error procura primero comprender el error antes de buscar en la red, es muy probable que alguien haya pasado por lo mismo que tu. Sin más que resaltar, vamos a divertirnos.

### Requerimientos del Workshop

**Requerimientos de la PC**

- Al menos 8 GB de Memoria RAM
- Espacio en Disco de xxx GB
- Contar con privilegios de Administrador

**Requerimientos de Software**

- [Instalar VSCode](#https://code.visualstudio.com/download)
- [Instalar Docker Desktop](#https://www.docker.com/products/docker-desktop/)
- Instalar NodeJS en [Mac](#https://www.youtube.com/watch?v=6VNkLyQeu3Y) o [Windows](#https://www.youtube.com/watch?v=Z-Ofqd2yBCc)
- Instalar Git en [Mac](#https://git-scm.com/download/mac) o [Windows](#https://gitforwindows.org/)
- [Crear una Cuenta en GitHub](#https://github.com/join)
- [Crear un Cuenta Free en Snyk](#https://app.snyk.io/login)

_Nota:_ Algunos sistemas operativos requieren software adicional para instalar el software

## Instalar una aplicación Vulnerable

Para el laboratorio vamos a utilizar una versión simplificada de la aplicación original: [Vulnerable NodeJS Applicaion](#https://github.com/payatu/vuln-nodejs-app). Si luego, deseas explorar más de 20 vulnerabilidades con su respectiva solución te recomiendo utilices su repositorio original; eso sí, vas a necesitar más recursos de tu computadora para correr los contenedores y también más espacio en disco.

1. Vamos a clonar el repositorio haciendo uso de git clone y guardarlo en una carpeta snyk-workshop

```
git clone https://github.com/dan-breu/nodejs-cmd-injection  snyk-workshop
```

2. Abrimos docker-desktop en nuestra computadora y creamos el contenedor
