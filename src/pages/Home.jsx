import React from "react";

const Home = () => {
  const styles = {
    homeSection: {
      position: "relative",
      width: "100%",
      height: "100vh",
      background: "url('https://files.oaiusercontent.com/file-QdqAuWJsuAhc2yGp8zecUF?se=2025-03-06T14%3A28%3A45Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D34c838a6-b702-49d8-a65f-cea0c611d7cf.webp&sig=VhcrrCjrxSzgtiRHUv1MT4hh%2BELpfkbZr6RaOMBwuOw%3D') no-repeat center center/cover",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    overlay: {
      position: "absolute",
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.6)", // Transparent black overlay
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    content: {
      color: "white",
      maxWidth: "600px",
      padding: "20px",
    },
    heading: {
      fontSize: "2.5rem",
      marginBottom: "10px",
    },
    paragraph: {
      fontSize: "1.2rem",
    },
    videoLogo: {
      position: "absolute",
      bottom: "20px",
      left: "20px",
      width: "80px",
      height: "80px",
    },
    video: {
      width: "100%",
      height: "100%",
      borderRadius: "10px",
    },
  };

  return (
    <section id="home" style={styles.homeSection}>
      <div style={styles.overlay}>
        <div style={styles.content}>
          <h1 style={styles.heading}>Welcome to Our Platform</h1>
          <p style={styles.paragraph}>Discover amazing experiences with us.</p>
        </div>
        <div style={styles.videoLogo}>
          <video autoPlay loop muted style={styles.video}>
            <source src="video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default Home;
