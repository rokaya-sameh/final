import { Link } from "react-router-dom"

function NavBar() {
 

  return (
    <>
    <div className="bg-gray-900 text-white space-x-20 justify-end items-end flex p-5">
       
        <Link  to="/">home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/Chatbot">Chatbot</Link>
    </div>
    
    </>
  )
}

export default NavBar