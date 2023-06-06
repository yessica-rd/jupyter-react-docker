# Readme

Los proyectos que están en repositorios separados en este repositorio están cada uno en su carpeta:

- /backend → <https://github.com/yessica-rd/jupyter-server-testing>
- /frontend →<https://github.com/yessica-rd/react-jupyter-testing>

## Configurar claasp

Crear una imagen desde el proyecto de claasp en local, pero antes hacer los siguientes cambios:

```bash

### Makefile

Añadir al archivo:
```bash
DOCKER_IMG_NAME=claasp-lib

rundocker: builddocker
	docker run -i -t $(DOCKER_IMG_NAME)
```

### Dockerfile

Añadir al final del archivo:
```bash
COPY . .

RUN make install
```

Ejecutar:

```bash
cd frontend
yarn install
cd ..
docker-compose up -d --force-recreate --build backend
docker-compose up
```

El proyecto se debe estar ejecutando en <http://localhost:3000>.
