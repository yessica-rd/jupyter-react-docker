FROM node:14

# Copiar archivos del frontend
COPY . /app

WORKDIR /app

# Instalar las dependencias del frontend
RUN npm install

# Compilar el proyecto de React
RUN npm run build

# Exponer el puerto en el que se ejecuta el servidor de desarrollo de React
EXPOSE 3000

# Ejecutar el servidor de desarrollo de React
CMD ["npm", "start"]
