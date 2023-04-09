import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/userContext";
import { signin } from "../types/routes";
import { toast } from "react-toastify";

export const Protect = ({ children }: any) => {
  const useAuth = useContext(AuthContext);
  if (useAuth.user.token) return children;
  else
    return (
      <>
        {toast("you must login first!", { toastId: 1, type: "error" })}
        <Navigate to={signin} />
      </>
    );
};
