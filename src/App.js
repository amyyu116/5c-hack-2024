import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const CS04profs = [
    {
      name: 'Jane Doe',
      syllabus: 'This course covers basic programming concepts.'
    },
    {
      name: 'John Doe',
      syllabus: 'This course covers differential calculus.'
    },
    // Add more professors as needed
  ];

  const [selectedProfIndex, setSelectedProfIndex] = useState(null);

  const handleProfSelection = (index) => {
    setSelectedProfIndex(index);
  };

  // AI-handling

  const [aiText, setAiText] = useState('Loading AI-generated content...'); // Initial text

  useEffect(() => {
    (async () => {
      try {
        const module = await import('https://esm.run/@google/generative-ai');
        const GoogleGenerativeAI = module.GoogleGenerativeAI;
        const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const prompt = "Write a story about a magic backpack.";
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        setAiText(text); // Update state with the AI text
      } catch (error) {
        console.error('Failed to load the AI module:', error);
        setAiText('Failed to load content. Please check the console for more details.');
      }
    })();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>App Title</h2>
      </header>
      <body>
        <p className='text'> Here is some text.</p>
        <div className='main'>
          <div className="lefthalf"> 
          
            {CS04profs.map((CS04prof, index) => (
              <div key={index}>
              <button onClick={() => handleProfSelection(index)}>{CS04prof.name}</button>
            </div>
              ))}
          </div>
          <div className="righthalf"> 
            <h2>(Course Code) Course Name</h2>
            {selectedProfIndex !== null && (
              <p>{CS04profs[selectedProfIndex].syllabus}</p>
            )}
            <p>{aiText}</p>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;