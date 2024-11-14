import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import CarForm from './components/CarForm';
import CarList from './components/CarList';
import CarDetails from './components/CarDetails';
import { getToken, logout } from './services/authService';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status when the app loads
  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Car Management System</h1>
          <nav>
            <Link to="/">Home</Link>
            {isAuthenticated ? (
              <>
                <Link to="/add-car">Add Car</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </nav>
        </header>

        <main>
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <CarList /> : <Navigate to="/login" />}
            />
            <Route
              path="/add-car"
              element={isAuthenticated ? <CarForm /> : <Navigate to="/login" />}
            />
            <Route
              path="/cars/:id"
              element={isAuthenticated ? <CarDetails /> : <Navigate to="/login" />}
            />
            <Route
              path="/cars/edit/:id"
              element={isAuthenticated ? <CarForm editMode /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={<AuthForm isLogin={true} />}
            />
            <Route
              path="/signup"
              element={<AuthForm isLogin={false} />}
            />
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
