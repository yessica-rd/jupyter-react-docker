FROM jupyter/datascience-notebook

# Copiar archivos del backend
COPY . /app

WORKDIR /app/backend

# Copiar el archivo de configuración
COPY jupyter_lab_config.py /home/jovyan/.jupyter/jupyter_lab_config.py

# Instalar las dependencias del backend (si las hay)
# RUN pip install -r requirements.txt

# Ejecutar el servidor de JupyterLab
CMD ["jupyter", "lab", "--ip=0.0.0.0"]


