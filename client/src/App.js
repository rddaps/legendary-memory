import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Homepage';
import Profile from './pages/MyLiving';
import Navbar from './components/Navbar';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="welcome-section">
        <h1>Welcome to Proper Key Management App</h1>
        <div className="properties-list">
        </div>
      </div>

      <div className="navbar">
        <img src="logo.png" alt="Logo Image" className="image-size" />
          <div className="navbar-links">
            <a href="#">Login</a>
            <a href="#">Sign Up</a>
          </div>
      </div>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/my'
              element={<Profile />}
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;