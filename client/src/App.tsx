import React, { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Weapons from './views/Weapons';
import WeaponDetails from './views/weapons/WeaponDetails';
import Header from './components/Header';
import Home from './views/Home';
import Signup from './views/Signup';
import Login from './views/Login';
import { useAuth } from './contexts/AuthContext';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import GlobalStyles from './globalStyles';
import UserProfile from './views/UserProfile';
import Logout from './components/Logout';
import renderWithMultiplePath from './utils/renderWithMultiplePaths';

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
          {renderWithMultiplePath(
            ['animes', 'weapons', 'mangas', 'movies', 'books'],
            <Weapons />,
          )}
          <Route path="/weapons/:id" element={<WeaponDetails />} />
          {auth && (
            <>
              <Route path="/my-profile" element={<UserProfile />} />
              <Route path="/logout" element={<Logout />} />
            </>
          )}
          {!auth && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
