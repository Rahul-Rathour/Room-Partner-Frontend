import './App.css';
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
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import ContactUs from './pages/ContactUs.jsx';

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
          <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
          <Route path='/contact' element={<ContactUs/>}/>
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
