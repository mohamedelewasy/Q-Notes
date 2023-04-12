import { useQuery } from "react-query";
import { verifyRequest } from "../axios/user";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/userContext";
import { toast } from "react-toastify";
import { docList } from "../types/routes";

export const Verify = () => {
  const useAuth = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSucess] = useState(false);
  useEffect(() => {
    if (useAuth.user.token)
      verifyRequest(params.code || "", useAuth.user.token || "")
        .then(() => setSucess(true))
        .catch((err) => setError((err as Error).message));
  }, [useAuth]);

  if (error) toast(error, { toastId: 12645, type: "error", autoClose: false });
  if (success)
    return <h1 style={{ textAlign: "center" }}>verified successfully</h1>;
  return <h1>Loading...</h1>;
};
