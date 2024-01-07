import './App.css';
import { NavBar } from './components/NavBar';
import Home from './pages/home';
import Antri from './pages/antri';
import Daftar from './pages/daftar';
import Update from './pages/update';
import { Footer } from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lihat from './pages/view';
import Delete from './pages/hapus';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/antri" element={<Antri />} />
          <Route exact path="/daftar" element={<Daftar />} />
          <Route exact path="/update/:id" element={<Update />} />
          <Route exact path="/view/:id" element={<Lihat />} />
          <Route path="/hapus/:id" element={<Delete />} />
        </Routes>
      </BrowserRouter>
      <NavBar />
      <Footer />
    </div>
  );
}

export default App;
