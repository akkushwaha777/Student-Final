import React from 'react'

function Image() {
  const imgStyle = {
    textAlign: "center",
    padding: "20px"
  };

  return (
    <div style={imgStyle}>
      <img
        src="https://via.placeholder.com/150"
        alt="Placeholder Logo"
        style={{ marginTop: "100px" }}
      />
    </div>
  );
}

export default Image;
