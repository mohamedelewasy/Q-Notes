import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/userContext";
import { docList } from "../types/routes";
import { toast } from "react-toastify";
import { profileRequest } from "../axios/user";

export const IsAdmin = ({ children }: any) => {
  const useAuth = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>();
  useEffect(() => {
    profileRequest(useAuth.user.token || "").then((res) => {
      if (res.isAdmin) setIsAdmin(true);
      else setIsAdmin(false);
    });
  }, [useAuth]);
  if (isAdmin) return children;
};
