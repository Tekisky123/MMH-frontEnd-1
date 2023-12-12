
import { Link } from "react-router-dom"
import "../../Assets/Styles/RegistrationStyles.css/Login.css"

const Login = () => {

  return (
    <div className='Main-container'>
<section>
      <div className="form-box">
        <div className="form-value">
          <form action="">
            <h2>Login</h2>
            <div className="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input type="email" required />
              <label>Email</label>
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input type="password" required />
              <label>Password</label>
            </div>
            <div className="forget">
              <label>
                <input type="checkbox" /> Remember Me{' '}
                <Link href="#">Forget Password</Link>
              </label>
            </div>
            <button>Log in</button>
            <div className="register">
              <p>
                Don't have an account <Link to={"/Signup"}>Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div> 
  )
}

export default Login