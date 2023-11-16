import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./composant/Main";
import Art from "./composant/Art";
import Connexion from "./composant/Connexion";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Art" element={<Art />} />
        <Route path="/Connexion" element={<Connexion />} />
      </Routes>
    </div>
  );
}

export default App;
