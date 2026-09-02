import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar'
import Homepage from './homepage/Homepage'

const App = () => {
  return(
    <BrowserRouter basename="/Pawned">
  <NavBar/>
  <Routes>
    <Route path='/' element={<Homepage/>}></Route>
  </Routes>
</BrowserRouter>
  )
}

export default App
