
const CodeServerIntegration = () => {
  const iframeStyle = {
    border: '2px solid lightgray',
    width: '90%',
    height: '800px',
  };

  return (
    <>
      <h1>Code-server Testing</h1>
      <iframe
        src="http://localhost:8080"
        style={iframeStyle}
      />
    </>
  );
};

export default CodeServerIntegration;
