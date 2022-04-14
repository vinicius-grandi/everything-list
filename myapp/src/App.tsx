import React, { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Weapons from './views/Weapons';
import Header from './components/Header';
import Home from './views/Home';
import Signup from './views/Signup';
import { useAuth } from './contexts/AuthContext';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import GlobalStyles from './globalStyles';
import UserProfile from './views/UserProfile';

function App(): JSX.Element {
  const { auth } = useAuth();
  const [hidden, setHidden] = useState(false);

  if (auth === 'standby') {
    return <h1>loading</h1>;
  }

  return (
    <>
      <GlobalStyles overflowHidden={hidden} />
      <BrowserRouter>
        <Header setHidden={setHidden} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weapons" element={<Weapons />} />
          {auth && <Route path="/my-profile" element={<UserProfile />} />}
          {!auth && <Route path="/signup" element={<Signup />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
