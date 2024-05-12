import LobbyScreen from './screens/LobbyScreen';
import './App.css';
import {Route, Routes} from "react-router-dom";


function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<LobbyScreen/>}/>
    </Routes>
    </div>
  );
}

export default App;