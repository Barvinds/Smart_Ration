import { useRef, useState, useEffect } from "react";

const Scan = () => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };
    startCamera();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.cameraBox}>
        <h2 style={styles.title}>Scan QR Code</h2>
        <div style={styles.cameraFrame}>
          <video ref={videoRef} autoPlay style={styles.video} />
        </div>
      </div>
      <button style={styles.submitButton}>Submit</button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    padding: "20px",
    background: "#0a8379",
    marginTop: "2rem",
  },
  cameraBox: {
    width: "100%",
    maxWidth: "500px",
    border: "2px solid #ccc",
    borderRadius: "16px",
    overflow: "hidden",
    background: "white",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "15px",
  },
  cameraFrame: {
    width: "100%",
    height: "300px",
    background: "black",
    borderRadius: "12px",
    overflow: "hidden",
    border: "4px solid #4F46E5",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  submitButton: {
    marginTop: "20px",
    background: "linear-gradient(to right, #2563EB, #9333EA)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "12px 24px",
    borderRadius: "30px",
    border: "none",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.3s ease",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 5px 10px rgba(0,0,0,0.2)",
  },
};

export default Scan;