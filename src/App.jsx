import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Home from './components/Home';
import useSmoothScroll from './hooks/useSmoothScroll';

function App() {
  useSmoothScroll();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


