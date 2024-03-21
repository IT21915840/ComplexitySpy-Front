import React, { useState } from 'react';
import axios from 'axios';
import image from "../img/image.jpg";
import logo from "../img/logo.png";
import img1 from "../img/w2.jpg";

// import ReportComponent from './ReportComponent';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function ComplexityCalculator() {
    const [code, setCode] = useState('');
    const [complexity, setComplexity] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCalculate = () => {
        setIsLoading(true);
        setError(null);

        axios.post('http://localhost:8080/calculate-complexity', { code })
            .then(response => {
                setComplexity(response.data);
            })
            .catch(error => {
                setError('Error calculating complexity. Please check your input and try again.');
                console.error('Error calculating complexity:', error);
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

    return (
        <div className='container'>
            <img src={img1} alt='complexity' className="background-image" />
            <div className='content'>
                
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <img src={image} alt='complexity' className="wcontainer" />
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <img src={logo} alt='logo' style={{ width: "50px", height: "50px", position: "absolute", top: "10px", left: "-55px" }} />



                    <h1 style={{ color: "white", textAlign: "center", zIndex: "1", marginTop: "10px" }}>ComplexitySpy</h1>
                </div>
            </div>

            <div className='CCMTcontainer'>
                <button className='btncal' onClick={() => window.location.href = '/TryCatchCalculator'}>Try Catch</button>
                <button className='btncal' onClick={() => window.location.href = '/MultipleInheritanceCalculator'}>Multiple Inheritance</button>
                <button className='btncal' onClick={() => window.location.href = '/ArrayDeclarationCalculator'}>Array Declaration</button>
                <button className='btncal' onClick={() => window.location.href = '/CompoundConditionalCalculator'}>Compound Conditional Statements</button>
                <br />
            </div>
                <br />
                < h4 style={{ color: "white" }}>Complexity Calculator</h4>
                <textarea
                    rows="15"
                    cols="100"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder="Enter your code here"
                    style={{ overflow: "scroll" }} 
                ></textarea>
                <br /><br />
                <button className= 'btncomplexity'onClick={handleCalculate} disabled={isLoading}>
                    {isLoading ? 'Calculating...' : 'Calculate  Total Complexity'}
                </button>
                <button className="btnclear" onClick={handleClear}>
                    Clear
                </button>
                <button className= 'btnreport'onClick={handleCalculate}>Report</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {complexity !== null && <h2 style={ {color:'white'}}>Calculated Complexity: {complexity}</h2>}
                {code && (
                    <diV style = {{height: "220px", overflowY : "scroll"  }}>
                    <SyntaxHighlighter
                        language="java"
                        style={vscDarkPlus}
                        showLineNumbers={true} // Add this line to enable line numbers
                        wrapLines={true}
                    >
                        {code}
                    </SyntaxHighlighter>
                    </diV>
                    )}
            </div>
        </div>
    );
}

export default ComplexityCalculator;

