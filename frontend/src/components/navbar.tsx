import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { docList, profile, signin, signup } from "../types/routes";
import { useContext, useState, useEffect, MouseEvent } from "react";
import { AuthContext } from "../context/userContext";
import { profileRequest } from "../axios/user";
import { toast } from "react-toastify";

export const NavBar = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const useAuth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (useAuth.user.token) {
      console.log("a7a navbar", useAuth.user.token);
      profileRequest(useAuth.user.token)
        .then((res) => {
          setEmail(res.email);
        })
        .catch((err) => setError((err as Error).message));
    }
  }, [useAuth]);

  const handleSignout = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      // await signoutRequest(useAuth.user.token || "");
      useAuth.signout();
      navigate(signin);
    } catch (error) {
      setError((error as Error).message);
    }
  };
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      {error && toast(error, { toastId: "400" })}
      <div className="container-fluid">
        <Link to={docList} className="navbar-brand">
          Q-Notes
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link"
                to={{
                  pathname: docList,
                  search: createSearchParams({
                    educationLevel: "secondary",
                  }).toString(),
                }}
              >
                Secondary School
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={{
                  pathname: docList,
                  search: `${createSearchParams({ educationLevel: "prep" })}`,
                }}
              >
                Prep School
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={{
                  pathname: docList,
                  search: `${createSearchParams({
                    educationLevel: "primary",
                  })}`,
                }}
              >
                Primary School
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={{
                  pathname: docList,
                  search: `${createSearchParams({
                    educationLevel: "kindergarten",
                  })}`,
                }}
              >
                Kindergarten School
              </Link>
            </li>
          </ul>
          <div className="d-flex gap-2 user-state">
            {useAuth.user.token ? (
              <>
                <Link to={profile}>
                  <button className="btn btn-solid-primary">{email}</button>
                </Link>
                <button
                  className="btn btn-solid-primary"
                  onClick={handleSignout}
                >
                  signout
                </button>
              </>
            ) : (
              <>
                <Link to={signin}>
                  <button className="btn btn-outline-primary">Sign in</button>
                </Link>
                <Link to={signup}>
                  <button className="btn btn-primary">Sign up</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
