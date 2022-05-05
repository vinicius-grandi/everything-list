import React, { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Items from './views/Items';
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
import WeaponDetails from './views/weapons/WeaponDetails';
import AnimeDetails from './views/animes/AnimeDetails';
import MovieDetails from './views/movies/MoviesDetails';
import BooksDetails from './views/books/BooksDetails';
import Loading from './components/Loading';

function App(): JSX.Element {
  const { auth } = useAuth();
  const [hidden, setHidden] = useState(false);

  if (auth === 'standby') {
    return <Loading size={200} />;
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
            <Items />,
          )}
          <Route path="/weapons/:id" element={<WeaponDetails />} />
          <Route path="/animes/:id" element={<AnimeDetails />} />
          <Route path="/mangas/:id" element={<AnimeDetails />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/books/:id" element={<BooksDetails />} />
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
