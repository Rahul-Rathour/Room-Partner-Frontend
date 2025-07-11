import './App.css';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from '../src/screens/Signup'
import Login from '../src/screens/Login'
import Home from './screens/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DisplayListings from './screens/DisplayListings.js';
import ListingDetail from './screens/ListingDetail.js';
import AddUser from './components/AddUser.js'
import MyListings from './pages/MyListings.js';
import UpdateProfile from './pages/UpdateProfile.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';

function App() {
  return (
    <BrowserRouter>
    {/* Navbar on all pages */}
        <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createuser' element={<Signup />} />
          <Route path='/listings' element={<DisplayListings />} />
          <Route path='/listing/:id' element={<ListingDetail />} />
          <Route path='/add-listing' element={<AddUser />} />
          <Route path="/my-listings" element={<MyListings/>} />
          <Route path="/update-profile" element={<UpdateProfile />} />
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
