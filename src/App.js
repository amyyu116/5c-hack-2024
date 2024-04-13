// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h2>App Title</h2>
        {/*The below is default sample code 
        
        
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        {/* option 1: search bar?
        
        
        <div class="search-container">
          <input type="text" placeholder="Search.." name="search"></input>
          <button type="submit"><i class="fa fa-search"></i></button>
  </div> */}
      </header>
      <body>
      <p class='text'> Here is some text.</p>
      <div class = 'main'>
        <div class="lefthalf"> 
            Left Div 
        </div>
        <div class="righthalf"> 
            <h2>(Course Code) Course Name</h2>
            <p>Here is the syllabus</p>
        </div>
      </div>
      </body>
      
    </div>
  );
}

export default App;
