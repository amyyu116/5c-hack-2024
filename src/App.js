import React, { useEffect, useState, useMemo  } from 'react';
import './App.css';

function App() {
  const courseName = 'Introduction to Computer Science';
  // dummy data
  const CS04profs = useMemo(() => [
    {
      name: 'Jane Doe',
      course_code: 'CS05',
      description: 'This course covers basic programming concepts at Harvey Mudd.',
      syllabusLink: 'janeDoeSyllabus.pdf',
      syllabusTxt: 'janeDoeSyllabus.txt'
    },
    {
      name: 'John Doe',
      course_code: 'CS04',
      description: 'This course covers basic programming concepts at Pitzer.',
      syllabusLink: 'johnDoeSyllabus.pdf',
      syllabusTxt: 'johnDoeSyllabus.txt'
    },
    {
      name: 'Jack Doe',
      course_code: 'CS51',
      description: 'This course has no information on it.',
      syllabusLink: 0
    }
  ], []);

  // changes shown prof on click
  const [selectedProfIndex, setSelectedProfIndex] = useState(0);

  const handleProfSelection = (index) => {
    setSelectedProfIndex(index);
  };

  // pdf viewer function

  const openSyllabusPreview = (url) => {
    window.open(url, '_blank', 'width=800,height=600');
  };

  // file upload handling

  // AI-handling

  const [aiText, setAiText] = useState('Loading AI-generated content...'); // Initial text
  

  useEffect(() => {
    (async () => {
      try {
        const module = await import('https://esm.run/@google/generative-ai');
        
        const GoogleGenerativeAI = module.GoogleGenerativeAI;
        const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        // avoid reusing text from other pages
        setAiText('Loading AI-generated content...');
        const txtPath = CS04profs[selectedProfIndex].syllabusTxt;
        const rresponse = await fetch(txtPath);
        if (!rresponse.ok) {
          throw new Error('Failed to fetch prompt text');
        }
        const promptText = await rresponse.text();
        const prompt = "Here is a syllabus: "  + promptText + "Using complete sentences, please summarize this syllabus including its grading policy.";;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        setAiText(text); // Update state with the AI text
      } catch (error) {
        console.error('Failed to load the AI module:', error);
        setAiText('Failed to load content. Please check the console for more details.');
      }
    })();
  }, [CS04profs, selectedProfIndex]);

  return (
    <div className="App">
      <header className="App-header">
        <h2>COURSE CRUSHER >:3C</h2>
      </header>
      <body>
        <p className='text'> Here is some text.</p>
        <div className='main'>
          <div className="lefthalf"> 
            {CS04profs.map((CS04prof, index) => (
              <div key={index}>
              <button 
                  onClick={() => handleProfSelection(index)}
                  className={selectedProfIndex === index ? 'selected' : 'unselected'}
                >
                  {CS04prof.course_code}: {CS04prof.name}
                </button>
            </div>
              ))}
          </div>
          <div className="righthalf"> 
            <h2>{CS04profs[selectedProfIndex].course_code} {courseName}<br></br>{CS04profs[selectedProfIndex].name}</h2>
            {CS04profs[selectedProfIndex].syllabusLink !== 0 && (
              <>
              <span>{CS04profs[selectedProfIndex].description}<br></br><p></p>Here is the <span onClick={() => openSyllabusPreview(CS04profs[selectedProfIndex].syllabusLink)} className = "link">syllabus</span>.</span>
              <p>{aiText}</p>
              </>
            )}
            {CS04profs[selectedProfIndex].syllabusLink === 0 && (
              <>
              <span>{CS04profs[selectedProfIndex].description}<br></br><p></p>Feel free to upload a syllabus for this course if you have taken it. </span>
              <p>Upload File</p>
              <br></br>
              <button className='upload'>Submit</button>
              </>
            )}
            
          </div>
        </div>
      </body>
    </div>
  );
};

export default App;