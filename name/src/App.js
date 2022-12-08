import logo from './logo.svg';
import './App.css';
import Page1 from './page1';
import Page2 from './page2';
import { Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Page 1</Link>
        <Link to="/page2">Page 2</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
      </Routes>
    </div>
  );
}

export default App;
