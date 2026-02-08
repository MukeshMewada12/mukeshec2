import { Link } from "react-router-dom";
import "./Home.css"
const Home=()=>{
    return(
     <>
      <div className="container">
        <div>
            <p>lgo</p>
        </div>
        <nav className="link">
            <Link to='/contact'>Contact</Link> 
            <Link to='/about'>About</Link>
            <Link to='/registration'>Register</Link>
            <Link to='/login'>Login</Link>
        </nav>
      </div>
        
        </>
    )
}
export default Home;