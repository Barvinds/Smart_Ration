import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#0a8379",
    padding: "40px 20px",
    marginTop: "4rem",
  },
  scanner: {
    width: "100%",
    maxWidth: "400px",
    marginBottom: "20px",
    background: "white",
    
  },
  button: {
    background: "#008000",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "1rem",
  },
};

const ScanQR = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount, selectedProducts } = location.state || {};
  const [scannedResult, setScannedResult] = useState("");

  React.useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

    scanner.render(
      (decodedText) => {
        setScannedResult(decodedText);
        scanner.clear();
      },
      (error) => console.error(error)
    );

    return () => scanner.clear();
  }, []);

  const handleSubmit = () => {
    if (scannedResult) {
      alert(`Payment confirmed for ₹${totalAmount}`);
      navigate("/"); // Redirect to home or success page
    } else {
      alert("Scan the QR code before submitting.");
    }
  };

  return (
    <div style={styles.container}>
      <div id="reader" style={styles.scanner}></div>
      <p style={{ color: "white" }}>Scanned Code: {scannedResult || "Waiting..."}</p>
      <button style={styles.button} onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ScanQR;
