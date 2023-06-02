# Configurar servidor con JupyterLab

- Instalar JupyterLab en local (para que funcione el debugger):

```bash
pip install jupyterlab
```

- Crear proyecto de Python o carpeta para guardar el proyecto.
- Abrir terminal en esa carpeta.
- Levantar servidor de JupyterLab:

```bash
jubyter-lab
```

## Configurar settings de JupyterLab

Si al intentar la conexión desde un iframe en React se obtiene este error:

```bash
Refused to frame 'http://localhost:8888/' because an ancestor violates the 
following Content Security Policy directive: "frame-ancestors 'self'".
```

Esta es la solución:

- Ir a la carpeta de la instalación en el equipo de Jupyter:

```bash
cd ~/.jupyter
```

- Buscar archivo `jupyter_lab_config.py`
- Si ese archivo no existe, crearlo:

```bash
jupyter lab --generate-config
```

- Añadir esta configuración:

```bash
c.NotebookApp.tornado_settings={
    'headers': {
        'Content-Security-Policy': "frame-ancestors * 'self' "
    }
}
```

- Reiniciar el servidor de JupyterLab:

```bash
jupyter-lab
```

## Crear componente de React

- Crear un componente de React para tener embebido el servidor de JupyterLab:

```jsx
const JupyterLabIntegration = () => {
  const iframeStyle = {
    border: '2px solid lightgray',
    width: '90%',
    height: '800px',
  };

  return (
    <>
      <h1>Jupyter Testing</h1>
      <iframe
        src="http://localhost:8888/lab"
        style={iframeStyle}
      />
    </>
  );
};

export default JupyterLabIntegration;
```

- Levantar servidor de React:

```bash
yarn start
```