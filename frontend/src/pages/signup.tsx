import { Link, useNavigate } from "react-router-dom";
import { home, signin } from "../types/routes";
import { useState, MouseEvent, useContext } from "react";
import axios, { AxiosError } from "axios";
import { API } from "../context/api";
import { userEndpoints } from "@english/shared";
import { AuthContext } from "../context/userContext";

export const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState(false);
  const useAuth = useContext(AuthContext);
  const handleSignup = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    axios
      .request({
        url: API + userEndpoints.signup.url,
        method: userEndpoints.signup.method,
        data: { email, password: pwd },
      })
      .then((res) => {
        setSuccess(true);
        setErrors("");
        useAuth.signin(res.data.token);
        setTimeout(() => {
          navigate(home);
        }, 2000);
      })
      .catch((err: AxiosError<{ error: [string] }>) => {
        setErrors(err.response?.data.error[0] || "");
      });
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6">
          <form>
            <h3 className="text-center my-4 text-capitalize">
              create a new acctount
            </h3>
            {success && (
              <div className="alert alert-success success-message" role="alert">
                verification code sent to your email
              </div>
            )}
            {errors && (
              <div className="alert alert-danger error-message" role="alert">
                {" "}
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

            <div className="col d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary btn-block mb-4 submit"
                onClick={handleSignup}
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
