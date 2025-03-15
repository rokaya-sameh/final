
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Home'
import NavBar from './navbar'
import Chatbot from './bot'
import Footer from './Footer'
import About from './About'
import Contact from './Contact'

function App() {
 


  return (
    <>
 

    
   
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/'element={<Home/>}></Route>
      <Route path='/About'element={<About/>}></Route>
      <Route path='/Contact'element={<Contact/>}></Route>
      <Route path='/Chatbot'element={<Chatbot/>}></Route>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
