import logo from './logo.svg';
import './App.css';
import { TestRoomClean } from './components/testRoom/TestRoomClean';
import { FirstPage } from "./components/menu/firstPage/firstPage.component";
import { HowToPlay } from "./components/menu/howToPlay/howToPlay.component";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/howToPlay" element={<HowToPlay />} />
          <Route path="/*" element={<FirstPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
