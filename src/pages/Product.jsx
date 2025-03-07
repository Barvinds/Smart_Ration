import React, { useState, useEffect } from "react";

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
  productList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1rem",
    padding: "1rem",
  },
  productCard: {
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    padding: "1rem",
    textAlign: "center",
    width: "200px",
  },
  productImage: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
  },
  button: {
    background: "#008000",
    color: "white",
    border: "none",
    padding: "5px 40px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  confirmButton: {
    background: "#333",
    color: "white",
    padding: "10px 50px",
    fontSize: "1rem",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
  totamt: {
    color: "white",
    marginBottom: "50px",
    textAlign: "center",
  },
};

const Product = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const toggleProduct = (product) => {
    setSelectedProducts((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const totalAmount = selectedProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <div style={styles.container}>
      <div style={styles.productList}>
        {products.map((product) => (
          <div key={product.id} style={styles.productCard}>
            <img src={product.img} alt={product.name} style={styles.productImage} />
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <p>Weight: {product.weight}</p>
            <button
              onClick={() => toggleProduct(product)}
              style={{
                ...styles.button,
                background: selectedProducts.some((p) => p.id === product.id) ? "#d9534f" : "#008000",
              }}
            >
              {selectedProducts.some((p) => p.id === product.id) ? "Deselect" : "Select"}
            </button>
          </div>
        ))}
      </div>
      <div style={styles.totamt}>
        <h3>Total Amount: ₹{totalAmount}</h3>
        <button style={styles.confirmButton}>Confirm</button>
      </div>
    </div>
  );
};

export default Product;
