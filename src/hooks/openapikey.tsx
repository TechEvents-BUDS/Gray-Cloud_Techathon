import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai'; // Import for Gemini API

const GeminiTerraformComponent = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // Replace with your actual API key
  const apiKey = 'AIzaSyBYaoERV-sNSmzh6qeC3jvrEd3jMz32of8'; 

  const generateTerraformCode = async () => {
    setLoading(true);
    try {
      // Initialize GoogleGenerativeAI client with your API key
      const genAI = new GoogleGenerativeAI(apiKey);

      const model = genAI.getGenerativeModel({ model: 'gemini-pro' }); // Specify Gemini model

      const promptText = `Write Terraform code to ${prompt}`; // Craft a clear prompt

      const result = await model.generateContent(promptText);
  
  // Ensure result.response.text is a string before trimming
  const generatedCode = (await result.response.text()).trim();
  setResponse(generatedCode);
    } catch (error) {
      console.error('Error generating Terraform code:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h1>Terraform Code Generator</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your resource requirements..."
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={generateTerraformCode} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Terraform Code'}
      </button>
      <h2>Generated Terraform Code:</h2>
      <pre
        style={{
          background: '#f4f4f4',
          padding: '1rem',
          borderRadius: '5px',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
        }}
      >
        {response || 'No code generated yet...'}
      </pre>
    </div>
  );
};

export default GeminiTerraformComponent;