import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Homepage from './pages/Homepage';
import MyLiving from './pages/MyLiving';
import Navbar from './components/Navbar';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route 
            path='/' 
            element={<Homepage />} 
          />
          <Route 
            path='/my' 
            element={<MyLiving />} 
          />
        </Routes>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
