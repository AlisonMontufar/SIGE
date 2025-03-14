import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
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
        </a>
        <button onClick={() => navigate('/login')} className="App-button">
          Ir a Login
        </button>
      </header>
    </div>
  );
}

export default App;
