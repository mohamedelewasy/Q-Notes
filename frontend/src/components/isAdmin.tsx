import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/userContext";
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
