import React from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes, Route } from "react-router-dom"
import LogIn from './pages/LogIn'
import AllBooks from './pages/allBooks'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import ViewBookDetails from './components/ViewBookDetails'

const App = () => {
  return (
    <div>
      
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/all-books' element={<AllBooks />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/LogIn' element={<LogIn />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='view-book-details/:id' element={<ViewBookDetails />} />
        </Routes>
        <Footer />
      

    </div>
  )
}

export default App