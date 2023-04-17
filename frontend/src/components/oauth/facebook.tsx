import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/userContext";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { docList, signin } from "../../types/routes";

export const FacebookAuth = () => {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    // eslint-disable-next-line eqeqeq
    if (token != undefined || token != null) {
      authContext.signin(token);
      navigate(docList);
    } else setError(true);
  }, []);

  if (error) {
    toast("login failed!", { toastId: 45, autoClose: false, type: "error" });
    navigate(signin);
  }

  return <h1>Loading...</h1>;
};
