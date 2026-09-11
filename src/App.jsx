import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar'
import Homepage from './homepage/Homepage'
import Shop from './ShopNow.jsx/Shop';

const App = () => {
  return(
    <BrowserRouter basename="/Pawned">
  <NavBar/>

  <Routes>
    <Route path='/' element={<Homepage/>}></Route>
    <Route path='/shop' element={<Shop/>}></Route>
  </Routes>

</BrowserRouter>
  )
}

export default App
