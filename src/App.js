import React, { useEffect, useState, useMemo  } from 'react';
import './App.css';

function App() {
  const courseName = 'Introduction to Computer Science';
  // dummy data
  const CS04profs = useMemo(() => [
    {
      name: 'Jane Doe',
      course_code: 'CS05',
      course_name: 'Introduction to Computer Science',
      description: 'This course covers basic programming concepts at Harvey Mudd.',
      syllabusLink: 'janeDoeSyllabus.pdf',
      syllabusTxt: 'janeDoeSyllabus.txt'
    },
    {
      name: 'John Doe',
      course_code: 'CS04',
      course_name: 'Intro to Comp Sci for Non-majors',
      description: 'This course covers basic programming concepts at Pitzer.',
      syllabusLink: 'johnDoeSyllabus.pdf',
      syllabusTxt: 'johnDoeSyllabus.txt'
    },
    {
      name: 'Jack Doe',
      course_code: 'CS51',
      course_name: 'Intro to CS with Lab',
      description: 'This course has no information on it.',
      syllabusLink: 0
    }
  ], []);

  // changes shown prof on click
  const [selectedProfIndex, setSelectedProfIndex] = useState(0);

  const handleProfSelection = (index) => {
    setSelectedProfIndex(index);
    setFile(null);
    setFileFeedback('');
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

  // search handlers
  // dropdown items
  

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = [
    { name: 'Intro to Caribbean Literature' },
    { name: 'Intermediate Ladder Theory' },
    { name: 'Media Studies Electives' },
    { name: 'Algorithms' },
    { name: 'SCR Core' },
    { name: 'Introductory Physics' },
    { name: 'Advanced Bioinformatics' }
  ].filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // file submission

  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }

const [fileFeedback, setFileFeedback] = useState('');
const handleFileSubmit = (event) => {
    event.preventDefault();  // Prevent the default form submission behavior

    if (!file) {
        setFileFeedback('Please select a file before clicking.');
    } else {
        setFileFeedback(`Thank you for submitting your file named ${file.name}`);
    }
};


  return (
    <div className="App">
      {/* header */}
      <header className="App-header">
        <h2>COURSE CRUSHER >:3c</h2>
        <div className="dropdown">
          {/* search bar */}
        <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                onClick={toggleDropdown}
              />
            <button className="dropbtn" >Select</button>
            <div id="myDropdown" className={`dropdown-content ${isOpen ? 'show' : ''}`}>
              {filteredItems.map((item) => (
                <button onFocus={handleSearch} onClick={toggleDropdown}>{item.name}</button>
              ))}
            </div>
          </div>
      </header>
      <body>
        <p className='text'> {courseName}</p>
        <div className='main'>
          <div className="lefthalf"> 
            {CS04profs.map((CS04prof, index) => (
              <div key={index}>
              <button 
                  onClick={() => handleProfSelection(index)}
                  className={selectedProfIndex === index ? 'selected' : 'unselected'}
                >
                  {CS04prof.name}
                </button>
            </div>
              ))}
          </div>
          <div className="righthalf"> 
            <h2>{CS04profs[selectedProfIndex].course_code} {CS04profs[selectedProfIndex].course_name}<br></br>{CS04profs[selectedProfIndex].name}</h2>
            {CS04profs[selectedProfIndex].syllabusLink !== 0 && (
              <>
              <span>{CS04profs[selectedProfIndex].description}<br></br><p></p>Here is the <span onClick={() => openSyllabusPreview(CS04profs[selectedProfIndex].syllabusLink)} className = "link">syllabus</span>.</span>
              <p>{aiText}</p>
              </>
            )}
            {CS04profs[selectedProfIndex].syllabusLink === 0 && (
              <>
              <span>{CS04profs[selectedProfIndex].description}</span>
              </>
            )}
            {CS04profs[selectedProfIndex].syllabusLink !== null && (
              <>
              <div className="button-container">
              <span><br></br><p></p>Feel free to upload a syllabus for this course if you have taken it.<br></br><p></p></span>
              <form onSubmit={handleFileSubmit}>
    <input type="file" onChange={handleChange} key={selectedProfIndex} /><br></br>
    <button type="submit" className='upload'>Submit</button>
    <p>{fileFeedback}</p>  {/* Display the feedback message here */}
</form>
</div>
</>
            )}
            
          </div>
        </div>
      </body>
    </div>
  );
};

export default App;