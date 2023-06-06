FROM claasp-lib

# Copiar archivos del backend
COPY . /app/backend

# Instala JupyterLab
RUN pip install jupyterlab

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


