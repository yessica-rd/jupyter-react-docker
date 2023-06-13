FROM claasp-lib

# Para eliminar ventana de confiar del IDE
COPY settings.json /root/.local/share/code-server/User/settings.json

# Para evitar error import ZZ
COPY sitecustomize.py /usr/lib/python3.10/sitecustomize.py

# Para vizualizar la carpeta compartida en un workspace
COPY shared.code-workspace /root/.local/share/code-server/User/Workspaces/shared.code-workspace

# Actualizar paquetes e instalar dependencias necesarias
RUN apt-get update && apt-get install -y curl wget git

# Descargar e instalar code-server
RUN curl -fsSL https://code-server.dev/install.sh | sh

# Instalar extensiones de code-server
RUN pip install xeus-python notebook

# Establecer el puerto de code-server
EXPOSE 8080 8081

# Ejecutar code-server cuando el contenedor se inicie
RUN code-server --install-extension ms-python.python
RUN code-server --install-extension ms-toolsai.jupyter
CMD ["code-server", "--open", "/root/.local/share/code-server/User/Workspaces/shared.code-workspace", "--bind-addr", "0.0.0.0:8080", "--auth", "none"]
