import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AuthModal = ({setShowModal, isSignup}) => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleClick = ()=>{
    setShowModal(false);
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      if (isSignup && (password != confirmPassword)){
        setError("Passwords need to match");
        return;
      }

      //Make  a post request to our database
      const response = await axios.post("http://localhost:8000/signup", {email, password});
      const success = response.status == 201;
      if (success) navigate("/onboarding"); 
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleClick}>X</div>
      <h2>{isSignup ? "CREATE ACCOUNT" : "LOG IN"}</h2>
      <p>
        By clicking Log in, you agree to our terms. Learn how we process
        your data in our Privacy Policy and Cookie Policy.
      </p>

      <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required={true}
            onChange={(e)=> setEmail(e.target.value)}
           />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required={true}
            onChange={(e)=> setPassword(e.target.value)}
           />

         {
          isSignup &&  <input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        placeholder="Confirm Password"
                        required={true}
                        onChange={(e)=> setConfirmPassword(e.target.value)}
                      />
         }

           <input className="secondary-button" type="submit" value="Submit"/>
           <p>{error}</p>
      </form>
      <hr />
      <h2>GET THE APP</h2>
    </div>
  )
}

export default AuthModal