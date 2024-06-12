import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from "./AuthContext";

import Home from './components/Home.js';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Home/>
      </Router>
    </AuthProvider>

  );
}

export default App;
