import React, { useState, useEffect } from "react";

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
    <>
      <div style={{ paddingTop: "4rem", textAlign: "center" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem", padding: "1rem" }}>
          {products.map((product) => (
            <div 
              key={product.id} 
              style={{ 
                background: "white", 
                borderRadius: "8px", 
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", 
                padding: "1rem", 
                textAlign: "center", 
                width: "200px" 
              }}
            >
              <img src={product.img} alt={product.name} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
              <h3>{product.name}</h3>
              <p>Price: ₹{product.price}</p>
              <p>Weight: {product.weight}</p>
              <button 
                onClick={() => toggleProduct(product)}
                style={{ 
                  background: "#008000", 
                  color: "white", 
                  border: "none", 
                  padding: "5px 10px", 
                  cursor: "pointer", 
                  borderRadius: "5px" 
                }}
              >
                {selectedProducts.some((p) => p.id === product.id) ? "Deselect" : "Select"}
              </button>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: "4rem" }}>
          <h3>Total Amount: ₹{totalAmount}</h3>
          <button 
            style={{ 
              background: "#333", 
              color: "white", 
              padding: "10px 20px", 
              fontSize: "1rem", 
              border: "none", 
              cursor: "pointer", 
              borderRadius: "5px" 
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;