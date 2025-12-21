import React from "react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="premium-footer">
      <p>
        © {year} Record Manager
      </p>
    </footer>
  );
}

export default Footer;