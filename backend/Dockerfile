# FROM node:16.14.0
# FROM ubuntu:22.10
FROM claasp-lib

RUN apt-get update && apt-get install -y libsecret-1-dev gnupg

RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Descargar e instalar Node.js 16.14.0
RUN curl -fsSL https://nodejs.org/dist/v16.14.0/node-v16.14.0-linux-x64.tar.xz -o node.tar.xz \
    && tar -xf node.tar.xz --strip-components=1 -C /usr/local \
    && rm node.tar.xz

# Descargar e instalar Yarn
RUN curl -fsSL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor -o /usr/share/keyrings/yarnkey.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /home/sage/tii-claasp/claasp

# Instalar las dependencias del sistema
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git

# Copiar los archivos de la aplicación
COPY package.json yarn.lock ./

# Instalar las dependencias del proyecto
RUN yarn install

# Construir el proyecto de Theia
RUN yarn theia build

# Exponer el puerto 3000 para acceder al IDE
EXPOSE 3000

# Comando para iniciar el IDE
CMD ["yarn", "theia", "start", "/home/sage/tii-claasp/claasp", "--hostname=0.0.0.0"]
