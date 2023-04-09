import { Link, useNavigate } from "react-router-dom";
import { home, signup } from "../types/routes";
import { useState, MouseEvent, useContext } from "react";
import axios, { AxiosError } from "axios";
import { userEndpoints } from "@english/shared";
import { API } from "../context/api";
import { AuthContext } from "../context/userContext";
export const Signin = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const useAuth = useContext(AuthContext);
  const handleLogin = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    axios
      .request({
        url: API + userEndpoints.signin.url,
        method: userEndpoints.signin.method,
        data: { email, password: pwd },
      })
      .then((res) => {
        useAuth.signin(res.data.token);
        navigate(home);
      })
      .catch((err: AxiosError<{ error: [string] }>) => {
        setErrors(err.response?.data.error.join("\n") || "");
      });
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6">
          <form>
            <h3 className="text-center my-4 text-capitalize">
              Log In to your account
            </h3>
            {errors && (
              <div className="alert alert-danger error-message" role="alert">
                {errors}
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
              <button
                type="submit"
                className="btn btn-primary btn-block mb-4"
                onClick={handleLogin}
              >
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
