FROM claasp-lib

# Copiar archivos del backend
COPY . /app/backend

# Para eliminar ventana de confiar del IDE
COPY settings.json /root/.local/share/code-server/User/settings.json

# Para evitar error import ZZ
COPY sitecustomize.py /usr/lib/python3.10/sitecustomize.py

# Actualizar paquetes e instalar dependencias necesarias
RUN apt-get update && apt-get install -y curl wget git

# Descargar e instalar code-server
RUN curl -fsSL https://code-server.dev/install.sh | sh

# Establecer el puerto de code-server
EXPOSE 8080

# Establece el directorio de trabajo
WORKDIR /home/sage/tii-claasp/claasp

# Ejecutar code-server cuando el contenedor se inicie
RUN code-server --install-extension ms-python.python
CMD ["code-server", "--bind-addr", "0.0.0.0:8080", ".", "--auth", "none"]

