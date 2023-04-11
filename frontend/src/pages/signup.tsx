import { Link, useNavigate } from "react-router-dom";
import { docList, signin } from "../types/routes";
import { useState, MouseEvent, useContext } from "react";
import { AuthContext } from "../context/userContext";
import { signupRequest } from "../axios/user";

export const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const useAuth = useContext(AuthContext);

  const handleSignup = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signupRequest(email, pwd);
      setSuccess(true);
      setError("");
      useAuth.signin(res.token);
      setTimeout(() => {
        navigate(docList);
      }, 2000);
    } catch (error) {
      setError((error as Error).message);
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6">
          <form onSubmit={handleSignup}>
            <h3 className="text-center my-4 text-capitalize">
              create a new acctount
            </h3>
            {success && (
              <div className="alert alert-success success-message" role="alert">
                verification code sent to your email
              </div>
            )}
            {error && (
              <div className="alert alert-danger error-message" role="alert">
                {error}
              </div>
            )}
            <div className="form-outline mb-4">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
              <label className="form-label" htmlFor="email">
                Email address
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                id="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                className="form-control"
              />
              <label className="form-label" htmlFor="password">
                Password
              </label>
            </div>

            <div className="col d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary btn-block mb-4 submit"
              >
                Sign Up
              </button>
            </div>
            <div className="text-center">
              <p>
                Already a user? <Link to={signin}>Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
