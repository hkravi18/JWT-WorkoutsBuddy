import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { useAuthContext } from './hooks/useAuthContext';

//pages & components 
import Home from './pages/Home'; 
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProducts from './pages/UserProducts';

function App() {
  // const {user} = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route 
              path="/"
              // element={user ? <Home /> : <Navigate to="/login" />}
              element={<Home />}
            />
            <Route
              path="/login"
              // element={!user ? <Login /> : <Navigate to="/" />}
              element={<Login />}
            />
            <Route
              path="/signup"
              // element={!user ? <Signup /> : <Navigate to="/" />}
              element={<Signup />}
            />
            <Route
              path="/myproducts"
              // element={!user ? <Signup /> : <Navigate to="/" />}
              element={<UserProducts />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
