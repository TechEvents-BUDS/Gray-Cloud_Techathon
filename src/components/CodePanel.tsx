import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai'; // Import for Gemini API
import { useFlowNodes } from '../hooks/useFlowNodes';
import { globalprompt } from '../hooks/useFlowNodes'; // Import global prompt

const CodePanel: React.FC = () => {
  const [terraformCode, setTerraformCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Replace with your actual API key
  const apiKey = 'AIzaSyBYaoERV-sNSmzh6qeC3jvrEd3jMz32of8';

  const generateTerraformCode = async () => {
    if (!globalprompt || globalprompt.trim() === '') {
      alert('Please select services before generating the Terraform code.');
      return;
    }

    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const promptText = `Write Terraform code to ${globalprompt}`; // Construct the prompt
      const result = await model.generateContent(promptText);

      const generatedCode = (await result.response.text()).trim();
      setTerraformCode(generatedCode);
    } catch (error) {
      console.error('Error generating Terraform code:', error);
      setTerraformCode('Error generating Terraform code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearCode = () => {
    setTerraformCode(''); // Clear Terraform code
  };

  const handleDeployClick = () => {
    // Simple alert for deployment error
    alert('Your code cannot be deployed because you have not connected your AWS credentials.');
  };

  return (
    <div className="h-full bg-gray-900 p-4 text-white overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold">Generated Terraform Code</h3>
        <div className="flex space-x-2">
          <button
            onClick={generateTerraformCode}
            className={`px-3 py-1 text-sm bg-blue-500 rounded hover:bg-blue-600 ${
              loading ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
          <button
            onClick={clearCode}
            className="px-3 py-1 text-sm bg-red-500 rounded hover:bg-red-600"
          >
            Clear
          </button>
        </div>
      </div>

      <pre className="text-sm font-mono bg-gray-800 p-4 rounded">
        <code>
          {terraformCode || 'No Terraform code generated yet. Enter a prompt and click Generate.'}
        </code>
      </pre>

      {/* Deploy button */}
      <div className="mt-4">
        <button
          onClick={handleDeployClick}
          className="w-full px-4 py-2 text-sm bg-green-500 rounded hover:bg-green-600"
        >
          Deploy
        </button>
      </div>
    </div>
  );
};

export default CodePanel;
