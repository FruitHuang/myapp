import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
	<h1>Daily Latin Quiz</h1>
      	<MyButton />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Daily Latin Quiz.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function MyButton() {
  return (
    <button>
      Move Left
    </button>
  );
}


export default App;
