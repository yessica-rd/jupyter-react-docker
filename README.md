# Readme

Configuración para usar JupyterLab configurando claasp.

Los proyectos que están en repositorios separados en este repositorio están cada uno en su carpeta:

- /backend → <https://github.com/yessica-rd/jupyter-server-testing>
- /frontend →<https://github.com/yessica-rd/react-jupyter-testing>

## Configurar claasp

- Clonar el proyecto de Crypto-TII:

```bash
git clone https://github.com/Crypto-TII/claasp.git
```

- Crear una imagen desde el proyecto de claasp en local, pero antes hacer los siguientes cambios:

### Makefile

Añadir al archivo:

```bash
DOCKER_IMG_NAME=claasp-lib
...
rundocker: builddocker
 docker run -i -t $(DOCKER_IMG_NAME)
```

### Dockerfile

Añadir al final del archivo:

```bash
COPY . .

RUN make install
```

Una vez creada la imagen de claasp-lib:

- `docker-compose up -d --force-recreate --build backend`
- `docker-compose up`

El proyecto se debe estar ejecutando en <http://localhost:3000>.
