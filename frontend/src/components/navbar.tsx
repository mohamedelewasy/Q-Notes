import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { home, profile, signin, signup } from "../types/routes";
import { useContext, useState, useEffect, MouseEvent } from "react";
import { AuthContext } from "../context/userContext";
import axios from "axios";
import { API } from "../context/api";
import { userEndpoints } from "@english/shared";

export const NavBar = () => {
  const [email, setEmail] = useState("");
  const useAuth = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (useAuth.user.token)
      axios
        .request({
          url: API + userEndpoints.profile.url,
          method: userEndpoints.profile.method,
          headers: { Authorization: `Bearer ${useAuth.user.token}` },
        })
        .then((res) => {
          setEmail(res.data.email);
        })
        .catch((err) => console.log(err));
    else setEmail("");
  }, [useAuth]);
  const handleSignout = (e: MouseEvent) => {
    axios.request({
      url: userEndpoints.signout.url,
      method: userEndpoints.signout.method,
      headers: { Authorization: `Bearer ${useAuth.user.token}` },
    });
    useAuth.signout();
    navigate(home);
  };
  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to={home} className="navbar-brand" reloadDocument>
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
                    pathname: home,
                    search: `${createSearchParams({
                      educationLevel: "secondary",
                    })}`,
                  }}
                  reloadDocument
                >
                  Secondary School
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={{
                    pathname: home,
                    search: `${createSearchParams({ educationLevel: "prep" })}`,
                  }}
                  reloadDocument
                >
                  Prep School
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={{
                    pathname: home,
                    search: `${createSearchParams({
                      educationLevel: "primary",
                    })}`,
                  }}
                  reloadDocument
                >
                  Primary School
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={{
                    pathname: home,
                    search: `${createSearchParams({
                      educationLevel: "kindergarten",
                    })}`,
                  }}
                  reloadDocument
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
    </>
  );
};
