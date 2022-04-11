import React from 'react';
import './index.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Weapons from './views/Weapons';
import Header from './components/Header';
import Home from './views/Home';
import Signup from './views/Signup';
import { useAuth } from './contexts/AuthContext';
import NotFound from './components/NotFound';
import Footer from './components/Footer';

function App(): JSX.Element {
  const { auth } = useAuth();

  if (auth === 'standby') {
    return <h1>loading</h1>;
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weapons" element={<Weapons />} />
        <Route path="/weapons?page=1" element={<Weapons />} />
        {!auth && <Route path="/signup" element={<Signup />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
