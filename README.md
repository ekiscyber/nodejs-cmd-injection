# Workshop de Análisis y Remediación de Código con Snyk

## Contenido del Workshop

1. [Diclaimer](#Disclaimer)
2. [Requerimientos del Workshop](#requerimientos-del-workshop)
3. [Conociendo Snyk Open-Source](#requerimientos-del-workshop)
4. [Instalar una aplicación vulnerable](#instalar-una-aplicación-vulnerable)
5. [Conociento Snyk CLI](#conociento-snyk-cli)
6. Mi primer análisis de Composición de Software(SCA)
7. Primer Desafío
8. Conociento Snyk Plug-in para VSCode
9. Remediando vulnerabilidades en las dependencias
10. Segundo Desafío
11. Conociendo Snyk Code
12. Remediando Vulnerabilidades en Código
13. Tercer Desafío
14. Cierre y próximos Pasos

<details>

### Disclaimer

Dependiendo en la plataforma que te encuentres algunos de los procedimientos, archivos y comandos pueden cambiar. Este workshop ha sido probado en ambientes Windows y Mac. Si te encuentras con algún error recuerda que es parte del proceso de aprendizaje y resolverlos es la gratificación. Ante cualquier error procura primero comprender el error antes de buscar en la red, es muy probable que alguien haya pasado por lo mismo que tu. Sin más que resaltar, vamos a divertirnos.

</details>

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

## Conociendo Snyk Open-Source

Cada vez que desarrollamos una aplicación hacemos uso de código open source. Este código en forma de librerías, son importadas a nuestra aplicación, permitiendo desarrollar aplicaciones de forma más rápita y nos evita tener que construir la misma funcionalidad una y otra vez. Estas librerías también dependen de otras más, y así se van reutilizando. Sin embargo, las librerías no están libres de tener vulnerabilidades o que alguien pueda modificar su código y es por esta razón que el uso de librerías expone a las organizaciones a tener problemas de seguridad y de licenciamiento.

**Snyk Open Source** permite analizar facilmente todas las librerías(dependencias) detectando vulnerabilidades en toda la rama de librerías. Sí, scuchaste bien, no solo analiza la librería principal, también analiza toda las librerías complementarias. Asimismo, analiza el licenciamiento de cada librería para proporcionarte una vista global del riesgo de seguridad en cuando al uso de librerías y licencias.

También puede integrarse con los sistemas de gestión de código (SCM) como github, gitlab, etc. Para analizar el codigo que está siendo almacenado en estos sistemas para determinar su riesgo actual.

![Snyk Open Source](snykopensource.png)

A lo largo del workshop vamos a utilizar esta funcionalidad, así como otras funcionalidades de Snyk.

## Instalar una aplicación Vulnerable

Vamos a la práctica. Para el laboratorio vamos a utilizar una versión simplificada de la aplicación original: [Vulnerable NodeJS Applicaion](#https://github.com/payatu/vuln-nodejs-app). Si luego, deseas explorar más de 20 vulnerabilidades con su respectiva solución te recomiendo utilices su repositorio original; eso sí, vas a necesitar más recursos de tu computadora para correr los contenedores y también más espacio en disco.

1. Utilizando la terminal o powershell en windows. Vamos a clonar el repositorio haciendo uso de git clone y guardarlo en una carpeta snyk-workshop

```
git clone https://github.com/dan-breu/nodejs-cmd-injection snyk-workshop
cd snyk-workshop
```

2. Ahora abrimos docker-desktop en nuestra computadora y luego creamos el contenedor utilizando los siguientes comandos.

```
docker build .
docker image ls
docker run -d -p 3000:3000 <IMAGE_ID>
docker ps -a
```

3. Abrimos un navegador e ingresamos a la dirección: localhost:8080. Nos debe mostrar la siguiente ventana.
   ![Captura de Pantalla de Node JS Vulnerable](screenshot-nodecmdinj.png)

4. En el primer campo de texto vamos a ingresar el siguiente comando.

```
8.8.8.8; ls -la
```

El resultado será el siguiente

```
Command Output

PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=37 time=47.8 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=37 time=52.4 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=37 time=54.5 ms

--- 8.8.8.8 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2013ms
rtt min/avg/max/mdev = 47.771/51.549/54.511/2.811 ms
Dockerfile
README.md
index.ejs
node_modules
package-lock.json
package.json
screenshot-nodecmdinj.png
server.js
serverfixed.js

```

Como podemos observar este campo de texto permite la ejecución de comandos propios del sistema a esto se le conoce como inyección de comando o [Command Injection](#https://owasp.org/www-community/attacks/Command_Injection). La razón es que el ingreso de texto en el campo no está limitado o sanitizado y permite erroneamente el ingreso de estos comandos. Más adelante vamos a remediar esta vulnerabilidad. Vamos bien hasta ahora.

5. Si necesitamos borrar el contenedor y la imagen podemos utilizar los siguientes comandos.

```
docker stop <CONTAINER_ID>
docker rm <CONTAINER_ID>
docker image rm <IMAGE_ID>
```

## Conociento Snyk CLI

Snyk CLI será la manera de llevar el poder de las pruebas de seguridad de Snyk a tu pipeline CI/CD. Dicho de otra manera, permitirá correr pruebas de seguridad via línea de comandos y de manera automatizada. Menos letra, vamos a la práctica.

> Nota: EKIS Cybersecurity ayuda a las empresas a integrar Snyk dentro del Pipeline de CI/CD.

1. Vamos a descargar Snyk CLI
