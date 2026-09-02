import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar'
import Homepage from './homepage/homepage'

const App = () => {
  return(
    <BrowserRouter>
    <NavBar/>

    <Routes>

      <Route path='/Pawned' element={<Homepage/>}></Route>

    </Routes>
    
    </BrowserRouter>
    
    
  )
}

export default App
