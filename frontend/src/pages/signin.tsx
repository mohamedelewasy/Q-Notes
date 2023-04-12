import { Link, useNavigate } from "react-router-dom";
import { docList, signup } from "../types/routes";
import { useState, useContext, useEffect, MouseEvent } from "react";
import { AuthContext } from "../context/userContext";
import { signinRequest } from "../axios/user";
import { toast } from "react-toastify";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const useAuth = useContext(AuthContext);

  useEffect(() => {
    if (useAuth.user.token) navigate(docList);
  }, []);

  const handleSignin = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signinRequest(email, pwd);
      useAuth.signin(res.token);
      navigate(docList);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  if (useAuth.user.token) {
    toast("already logged in", { toastId: 545, type: "info" });
    navigate(docList);
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6">
          <form onSubmit={handleSignin}>
            <h3 className="text-center my-4 text-capitalize">
              Log In to your account
            </h3>
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

            <div className="row mb-4">
              <div className="col d-flex justify-content-center">
                <a href="#!">Forgot password?</a>
              </div>
            </div>

            <div className="col d-flex justify-content-center">
              <button type="submit" className="btn btn-primary btn-block mb-4">
                Sign In
              </button>
            </div>

            <div className="text-center">
              <p>
                Not a member? <Link to={signup}>Sign up</Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
