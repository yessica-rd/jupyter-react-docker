FROM claasp-lib

# Copiar archivos del backend
COPY . /app/backend

# Install nodejs
RUN apt-get update && apt-get install wget xz-utils ca-certificates --yes --no-install-recommends

RUN wget https://nodejs.org/dist/v18.16.0/node-v18.16.0-linux-x64.tar.xz -O node.tar.xz

RUN tar -xf node.tar.xz -C /opt/ && rm -r node*

WORKDIR /home/sage

ENV SHELL=/bin/bash

ENV PATH="/home/sage/sage/src/bin:/home/sage/sage/build/bin:/home/sage/sage/local/var/lib/sage/venv-python3.11.1/bin:/home/sage/sage/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/opt/node-v18.16.0-linux-x64/bin/"

# Instala JupyterLab
RUN pip install jupyterlab xeus-python==0.15.0

RUN jupyter labextension install @jupyterlab/debugger

# Configura JupyterLab
RUN jupyter serverextension enable --py jupyterlab

# Establece el directorio de trabajo
WORKDIR /app/backend

# Copiar el archivo de configuración
COPY jupyter_lab_config.py /root/.jupyter/jupyter_lab_config.py

COPY kernel.json /usr/share/jupyter/kernels/python3/kernel.json

# Expone el puerto de JupyterLab
EXPOSE 8888

# Comando de inicio para JupyterLab
CMD ["jupyter", "lab", "--ip=0.0.0.0", "--port=8888", "--allow-root"]


