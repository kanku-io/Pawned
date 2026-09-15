import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar'
import Homepage from './homepage/Homepage'
import Shop from './shopscreen/Shop';
import TeeDetail from './components/product/TeeDetail';
import HatDetail from './components/product/HatDetail';

const App = () => {
  return(
    <BrowserRouter basename="/Pawned">
      <NavBar/>

      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/shop' element={<Shop/>}></Route>
        <Route path='/shop/tees/:slug' element={<TeeDetail/>}></Route>
        <Route path='/shop/hats/:slug' element={<HatDetail/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App