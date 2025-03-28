import React, { useState } from "react";
import axios from "axios";
import img1 from "../img/w2.jpg";

function CompoundConditionalCalculator() {
  const [codeIF, setCodeIF] = useState("");
  const [complexity, setComplexity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [codeFor, setCodeFor] = useState("");
  const [complexityFor, setComplexityFor] = useState(null);
  const [isLoadingFor, setIsLoadingFor] = useState(false);
  const [errorFor, setErrorFor] = useState(null);

  const handleCalculateIF = () => {
    setIsLoading(true);
    setError(null);

    axios
      .post("http://localhost:8080/calculate-complexity-if", { codeIF })
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

  const handleCalculateFor = () => {
    setIsLoadingFor(true);
    setErrorFor(null);

    axios
      .post("http://localhost:8080/calculate-complexity-switch", { codeFor })
      .then((response) => {
        setComplexityFor(response.data);
      })
      .catch((error) => {
        setErrorFor(
          "Error calculating complexity. Please check your input and try again."
        );
        console.error("Error calculating complexity:", error);
      })
      .finally(() => {
        setIsLoadingFor(false);
      });
  };

  const handleClearIf = () => {
    setCodeIF(""); // Clear the textarea
    setComplexity(null); // Clear the calculated complexity
    setError(null); // Clear any error message
  };

  const handleClearFor = () => {
    setCodeFor(""); // Clear the textarea
    setComplexity(null); // Clear the calculated complexity
    setError(null); // Clear any error message
  };

  const handleClearComments = () => {
    // Create a regular expression to match comments (// and /* */)
    const commentRegex = /\/\/[^\n]*|\/\*[\s\S]*?\*\/|#.*$/gm;

    // Remove comments from the code and set the textarea value
    setCodeIF(codeIF.replace(commentRegex, ""));
    setCodeFor(codeFor.replace(commentRegex, ""));
  };

  return (
    <div className="container">
      <img src={img1} alt='complexity' className="background-image" />
      <div className="content" style={{width:"1000px"}}>
        <div className="CCMTcontainer">
        <h1 style={{ color: "white" }}>
          Compound Conditional Complexity Calculator
        </h1>
          <button
            className="btncal" style={{marginRight: "100px"}}
            onClick={() => (window.location.href = "/")}
          >
            Home
          </button>
          <button className="btnclear" onClick={handleClearComments} style={{marginRight:"100px"}}>
            Clear Comments
          </button>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "60px" }}>
            <textarea
              rows="10"
              cols="50"
              value={codeIF}
              onChange={(e) => setCodeIF(e.target.value)}
              placeholder="Enter your codeIF here"
              style={{ overflow: "scroll" }}
            ></textarea>
            <br></br>
            <button
              className="btncomplexity"
              onClick={handleCalculateIF}
              disabled={isLoading}
            >
              {isLoading ? "Calculating..." : "Calculate Complexity IF"}
            </button>
            <button className="btnclear" onClick={handleClearIf}>
          Clear
        </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {complexity !== null && (
              <p style={{ color: " white" }}>
                Calculated IF Complexity: {complexity}
              </p>
            )}
          </div>

          <div>
            <textarea
              rows="10"
              cols="50"
              value={codeFor}
              onChange={(e) => setCodeFor(e.target.value)}
              placeholder="Enter your switch statement code here"
              style={{ overflow: "scroll" }}
            ></textarea>
            <br></br>
            <button
              className="btncomplexity"
              onClick={handleCalculateFor}
              disabled={isLoadingFor}
            >
              {isLoadingFor ? "Calculating..." : "Calculate  Switch Statement Complexity"}
            </button>
            <button className="btnclear" onClick={handleClearFor}>
          Clear
        </button>
            {errorFor && <p style={{ color: "red" }}>{errorFor}</p>}
            {complexityFor !== null && (
              <p style={{ color: " white" }}>
                Calculated Switch Case Complexity: {complexityFor}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompoundConditionalCalculator;
