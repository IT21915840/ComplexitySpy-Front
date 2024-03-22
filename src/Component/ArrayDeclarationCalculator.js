import React, { useState } from "react";
import axios from "axios";
import img1 from "../img/w2.jpg";

function ArrayDeclarationCalculator() {
  const [code, setCode] = useState("");
  const [complexity, setComplexity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setIsLoading(true);
    setError(null);

    axios
      .post("http://localhost:8080/array-declaration", { code })
      .then((response) => {
        setComplexity(response.data);
      })
      .catch((error) => {
        setError(
          "Error calculating complexity. Please check your input and try again."
        );
        console.error("Error calculating complexity:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClear = () => {
    setCode(""); // Clear the textarea
    setComplexity(null); // Clear the calculated complexity
    setError(null); // Clear any error message
  };

  const handleClearComments = () => {
    // Create a regular expression to match comments (// and /* */)
    const commentRegex = /\/\/[^\n]*|\/\*[\s\S]*?\*\/|#.*$/gm;
    
    // Remove comments from the code and set the textarea value
     setCode(code.replace(commentRegex, ""));
  };

  return (
    <div className="container">
       <img src={img1} alt='complexity' className="background-image" />
      <div className="content">
        <div className="CCMTcontainer">
        <h1 style={{ color: "white" }}>Array Declaration Complexity Calculator</h1>
          <button
            className="btncal"
            onClick={() => (window.location.href = "/")}
          >
            Home
          </button>
          <button className="btnclear" onClick={handleClearComments}>
            Clear Comments
          </button>
        </div>
        <textarea
          rows="15"
          cols="100"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your code here"
          style={{ overflow: "scroll" }} 
        ></textarea>
        <br />
        <button
          className="btncomplexity"
          onClick={handleCalculate}
          disabled={isLoading}
        >
          {isLoading ? "Calculating..." : "Calculate Complexity"}
        </button>
        <button className="btnclear" onClick={handleClear}>
            Clear
          </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {complexity !== null && <p  style={{color: " white"}}>Calculated Complexity: {complexity}</p>}
      </div>
    </div>
  );
}

export default ArrayDeclarationCalculator;