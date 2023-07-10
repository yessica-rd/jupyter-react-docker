FROM claasp-lib

RUN mkdir -p /home/community/paquito

RUN sudo adduser --disabled-password paquito

# Para evitar error import ZZ
COPY sitecustomize.py /usr/lib/python3.10/sitecustomize.py

# Actualizar paquetes e instalar dependencias necesarias
RUN apt-get update && apt-get install -y curl wget git

# Agregar el usuario al grupo sudo y configurar permisos sin contraseña
RUN echo 'paquito ALL=(ALL) NOPASSWD:ALL' > /etc/sudoers.d/paquito
RUN chmod 0440 /etc/sudoers.d/paquito

USER paquito

# Descargar e instalar code-server
RUN curl -fsSL https://code-server.dev/install.sh | sh

# Instalar extensiones de code-server
RUN sudo pip install xeus-python notebook

# Instalar Linter y Formatter
RUN sudo pip install -U pycodestyle pydocstyle

# Establecer el puerto de code-server
EXPOSE 8080

# Ejecutar code-server cuando el contenedor se inicie
RUN code-server --install-extension ms-python.python
RUN code-server --install-extension ms-toolsai.jupyter

# Para eliminar ventana de confiar del IDE
COPY settings.json /home/paquito/.local/share/code-server/User/settings.json

# Para vizualizar la carpeta compartida en un workspace
COPY shared.code-workspace /home/paquito/.local/share/code-server/User/Workspaces/shared.code-workspace

USER root
RUN chown root /home/paquito/.local/share/code-server/User/Workspaces/shared.code-workspace
RUN chown root /home/paquito/.local/share/code-server/User/settings.json
RUN chown -R root /home/paquito/.local/share/code-server/extensions
RUN chmod -R 755  /home/paquito/.local/share/code-server/extensions
RUN chmod 755  /home/paquito/.local/share/code-server/User/settings.json
RUN chmod 755  /home/paquito/.local/share/code-server/User/Workspaces/shared.code-workspace

# Quitar privilegios de sudo al usuario
RUN rm /etc/sudoers.d/paquito

USER paquito

CMD ["code-server", "--open", "/home/paquito/.local/share/code-server/User/Workspaces/shared.code-workspace", "--bind-addr", "0.0.0.0:8080", "--auth", "none"]
