import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Explore from './pages/Explore'
import ForgotPassword from './pages/ForgotPassword'
import CreateListing from './pages/CreateListing'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Offers from './pages/Offers'
import NavBar from './components/NavBar'
import PrivateRoute from './components/PrivateRoute'
import Category from './pages/Category'
import Listing from './pages/Listing'
import {ToastContainer} from 'react-toastify'
import Contact from './pages/Contact'
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
    <Router>
    <Routes>
    <Route path='/' element={<Explore/>} />
    <Route path='/offers' element={<Offers />} />
    <Route path='/profile' element={<PrivateRoute />}>
    <Route path='/profile' element={<Profile />} />

    </Route>
    <Route path='/category/:categoryName' element={<Category />} />
    <Route path='/sign-in' element={<SignIn/>} />
    <Route path='/sign-up' element={<SignUp/>} />
    <Route path='/forgot-password' element={<ForgotPassword/>}/>
    <Route path='/create-listing' element={<CreateListing />} />
    <Route path='/category/:categoryName/:listingId' element={<Listing />}/>
    <Route path='/contact/:landlordId'element={<Contact />}/>




    </Routes>

    <NavBar />

    </Router>
    <ToastContainer />
    </>


  )
}

export default App;
