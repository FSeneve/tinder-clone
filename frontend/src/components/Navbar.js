import whiteLogo from "../images/tinder_logo_white.png";
import colorLogo from "../images/color-logo-tinder.png";

const Navbar = ({minimal,setShowModal, showModal, setIsSignup}) => {

  const handleClick = ()=>{
    setShowModal(true); 
    setIsSignup(false);
  }

  const authToken = false;

  return (
    <nav>
        <div class="logo-container">
            <img className="logo" src={minimal ? colorLogo : whiteLogo} />
        </div>
        {!authToken && !minimal && 
        <button 
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}
        >
          Log in
      </button>}
    </nav>
  )
}

export default Navbar