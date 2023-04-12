import { useRef, useState, useContext, MouseEvent, useEffect } from "react";
import { AuthContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { signin } from "../types/routes";
import {
  profileRequest,
  updateEmailRequest,
  updatePasswordRequest,
} from "../axios/user";
import { toast } from "react-toastify";

export const Profile = () => {
  const [pwd, setPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [email, setEmail] = useState("");
  const [currEmail, setCurrEmail] = useState("");
  const navigate = useNavigate();
  const useAuth = useContext(AuthContext);
  useEffect(() => {
    profileRequest(useAuth.user.token || "").then((res) =>
      setCurrEmail(res.email)
    );
  }, []);
  const handleUpdateEmail = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await updateEmailRequest(email, pwd, useAuth.user.token || "");
      useAuth.signout();
      navigate(signin);
    } catch (error) {
      toast((error as Error).message, { toastId: 54, type: "error" });
    }
  };
  const handleUpdatePassword = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await updatePasswordRequest(pwd, newPwd, useAuth.user.token || "");
      toast("verification code sent to your new email", {
        toastId: 404,
        type: "success",
      });
      useAuth.signout();
      navigate(signin);
    } catch (error) {
      toast((error as Error).message, { toastId: 49, type: "error" });
    }
  };
  const updateEmail = useRef<HTMLDivElement>(null);
  const updatePassword = useRef<HTMLDivElement>(null);
  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="page-content page-container mt-4" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-xl-6 col-md-12">
              <div className="card user-card-full" style={{ padding: "10px" }}>
                <div className="row m-l-0 m-r-0">
                  <div className="col-sm-4 bg-c-lite-green user-profile">
                    <div className="card-block text-center text-white">
                      <div className="m-b-25">
                        <img
                          src="https://img.icons8.com/bubbles/100/000000/user.png"
                          className="img-radius"
                          alt="User-Profile-Image"
                        />
                      </div>
                      {/* <h6 className="f-w-600">Hembo Tingor</h6>
                      <p>Web Designer</p>
                      <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i> */}
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="card-block">
                      <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                        Information
                      </h6>
                      <div className="row">
                        <p className="m-b-10 f-w-600">Email</p>

                        <h6 className="text-muted f-w-400">{currEmail}</h6>
                      </div>
                      {/* update email */}
                      <div
                        className="row d-none"
                        style={{ maxWidth: "300px" }}
                        ref={updateEmail}
                      >
                        <form className="d-flex flex-column gap-2">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="enter your new email"
                            className="form-control"
                          />
                          <input
                            type="password"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            placeholder="enter your old password"
                            className="form-control"
                          />
                          <button
                            type="submit"
                            className="btn btn-primary btn-block mb-4"
                            onClick={handleUpdateEmail}
                          >
                            update email
                          </button>
                        </form>
                      </div>
                      {/* update password */}
                      <div
                        className="row d-none"
                        ref={updatePassword}
                        style={{ maxWidth: "300px" }}
                      >
                        <form className="d-flex flex-column gap-2">
                          <input
                            type="password"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            placeholder="enter your old password"
                            className="form-control"
                          />
                          <input
                            type="password"
                            value={newPwd}
                            onChange={(e) => setNewPwd(e.target.value)}
                            placeholder="enter your new password"
                            className="form-control"
                          />
                          <button
                            type="submit"
                            className="btn btn-primary btn-block mb-4"
                            onClick={handleUpdatePassword}
                          >
                            update password
                          </button>
                        </form>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="d-flex flex-column gap-2">
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => {
                                updateEmail.current?.classList.toggle("d-none");
                                updatePassword.current?.classList.add("d-none");
                              }}
                            >
                              update email
                            </button>
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => {
                                updatePassword.current?.classList.toggle(
                                  "d-none"
                                );
                                updateEmail.current?.classList.add("d-none");
                              }}
                            >
                              update password
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
