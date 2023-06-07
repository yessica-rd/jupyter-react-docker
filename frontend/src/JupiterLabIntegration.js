
const JupyterLabIntegration = () => {
  const iframeStyle = {
    border: '2px solid lightgray',
    width: '90%',
    height: '800px',
  };

  return (
    <>
      <h1>Theia Testing 🤯</h1>
      <iframe
        title="theia IDE"
        src="http://localhost:3000"
        style={iframeStyle}
      />
    </>
  );
};

export default JupyterLabIntegration;
