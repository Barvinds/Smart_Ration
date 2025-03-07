import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import uniqid from "uniqid";
import { Base64 } from "js-base64";
import sha256 from "crypto-js/sha256";

const Scan = () => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get totalAmount from Product.jsx
  const totalAmount = location.state?.totalAmount || 0; // Default to 0 if not passed
  const amountInPaise = totalAmount * 100; // Convert to paise

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

  const handlePayment = async () => {
    try {
      const merchantTransactionId = uniqid();
      const SALT_KEY = "96434309-7796-489d-8924-ab56988a6076";
      const SALT_INDEX = 1;

      const normalPayLoad = {
        merchantId: "PGTESTPAYUAT86",
        merchantTransactionId,
        merchantUserId: "MUID123",
        amount: amountInPaise,
        redirectMode: "REDIRECT",
        mobileNumber: "8870666787",
        paymentInstrument: { type: "PAY_PAGE" },
      };

      const base64EncodedPayload = Base64.encode(JSON.stringify(normalPayLoad));
      const stringToHash = base64EncodedPayload + "/pg/v1/pay" + SALT_KEY;
      const sha256Hash = sha256(stringToHash);
      const xVerifyChecksum = `${sha256Hash}###${SALT_INDEX}`;

      const response = await axios.post(
        "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
        { request: base64EncodedPayload },
        {
          headers: {
            "Content-Type": "application/json",
            "X-VERIFY": xVerifyChecksum,
            accept: "application/json",
          },
        }
      );

      const paymentUrl = response.data.data.instrumentResponse.redirectInfo.url;
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.cameraBox}>
        <h2 style={styles.title}>Scan QR Code</h2>
        <div style={styles.cameraFrame}>
          <video ref={videoRef} autoPlay style={styles.video} />
        </div>
      </div>
      <p style={styles.amountText}>Total Amount: ₹{totalAmount}</p>
      <button style={styles.submitButton} onClick={handlePayment}>
        Submit
      </button>
    </div>
  );
};

const styles = {
  container: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", padding: "20px", background: "#0a8379", marginTop: "2rem" },
  cameraBox: { width: "100%", maxWidth: "500px", border: "2px solid #ccc", borderRadius: "16px", overflow: "hidden", background: "white", padding: "20px", textAlign: "center", boxShadow: "0 10px 20px rgba(0,0,0,0.2)" },
  title: { fontSize: "20px", fontWeight: "bold", color: "#333", marginBottom: "15px" },
  cameraFrame: { width: "100%", height: "300px", background: "black", borderRadius: "12px", overflow: "hidden", border: "4px solid #4F46E5", boxShadow: "0 5px 15px rgba(0,0,0,0.3)" },
  video: { width: "100%", height: "100%", objectFit: "cover" },
  amountText: { fontSize: "18px", fontWeight: "bold", color: "white", marginTop: "15px" },
  submitButton: { marginTop: "20px", background: "linear-gradient(to right, #2563EB, #9333EA)", color: "white", fontSize: "16px", fontWeight: "bold", padding: "12px 24px", borderRadius: "30px", border: "none", cursor: "pointer", transition: "transform 0.2s ease, box-shadow 0.3s ease", width: "100%", maxWidth: "500px", boxShadow: "0 5px 10px rgba(0,0,0,0.2)" },
};

export default Scan;
