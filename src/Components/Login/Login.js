import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="container">
      {/* <!-- Div for login grid layout --> */}
      <div className="login-grid">
        {/* <!-- Div for login text --> */}
        <div className="login-text">
          <h2>Login</h2>
        </div>
        {/* <!-- Additional login text with a link to Sign Up page --> */}
        <div className="login-text">
          Are you a new member?          
          <span>
          <Link to="/signup" style={{color: "#2190ff"}}>
          {" "}
          Sign Up here</Link>
           
          
          </span>
        </div>
        <br />
        {/* <!-- Div for login form --> */}
        <div className="login-form">
          <form>
            {/* <!-- Form group for email input --> */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                aria-describedby="helpId"
              />
            </div>
            {/* <!-- Form group for password input --> */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
               name="password"
               id="password"
               type="password"
               pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
               title="Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
               required
               className="form-control"
               placeholder="Enter your password"
               aria-describedby="helpId"
               autoComplete="current-password"
              />
            </div>
            {/* <!-- Button group for login and reset buttons --> */}
            <div className="btn-group">
              <button
                type="submit"
                className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
              >
                Login
              </button>
              <button
                type="reset"
                className="btn btn-danger mb-2 waves-effect waves-light"
              >
                Reset
              </button>
            </div>
            <br />
            {/* <!-- Additional login text for 'Forgot Password' option --> */}
            <div className="login-text">Forgot Password?</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
