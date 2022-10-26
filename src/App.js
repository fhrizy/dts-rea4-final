import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthContextProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [title, setTitle] = useState('Home');
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home setTitle={setTitle} />} />
          <Route path='movie/:list' element={<Movies setTitle={setTitle} />} />
          <Route path='movie/detail/:mid' element={<MovieDetail setTitle={setTitle} />} />
          <Route path='/login' element={<Login setTitle={setTitle} />} />
          <Route path='/signup' element={<Signup setTitle={setTitle} />} />
          <Route
            path='/account'
            element={
              <ProtectedRoute>
                <Account setTitle={setTitle} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
