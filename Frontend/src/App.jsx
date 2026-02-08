import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Home from './Components/Home';
import Contact from './Components/Contact';
import About from './Components/About';
import LoginForm from './Components/LoginForm';
import RegistrationForm from './Components/RegistrationForm';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/login' element={<LoginForm/>}/>
      <Route path='/registration' element={<RegistrationForm/>}/>
      </Routes>
      </BrowserRouter>
    
    </>
  

  )
}

export default App
