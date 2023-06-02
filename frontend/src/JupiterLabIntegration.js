
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
