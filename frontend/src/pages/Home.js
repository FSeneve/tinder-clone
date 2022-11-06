import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";
import { useState } from "react";

const Home = () => {

    const [showModal, setShowModal] = useState(false);
    const [isSignup, setIsSignup] = useState(true);

    let authToken = false;

    const handleClick = ()=>{
        console.log("clicked");
        setShowModal(true);
        setIsSignup(true);
    }

  return (
    <div className="overlay">
    <Navbar 
    minimal={false} 
    setShowModal={setShowModal} 
    showModal={showModal}
    setIsSignup={setIsSignup}
    />
    <div className="home">
        <h1 className="primary-title">Swipe Right</h1>
        <button className="primary-button" onClick={handleClick}>
            {
                authToken ? "Signout" : "Create Account"
            }
        </button>

        {showModal && (<AuthModal setShowModal={setShowModal} isSignup={isSignup} />)}
    </div>
    </div>
  )
}

export default Home;