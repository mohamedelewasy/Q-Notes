import axios, { AxiosError } from "axios";
import { useRef, useState, useContext, MouseEvent } from "react";
import { API } from "../context/api";
import { userEndpoints } from "@english/shared";
import { AuthContext } from "../context/userContext";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { signin } from "../types/routes";

export const Profile = () => {
  const [pwd, setPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const useAuth = useContext(AuthContext);
  const { data, status } = useQuery("profile", async () => {
    return (
      await axios.request({
        url: API + userEndpoints.profile.url,
        method: userEndpoints.profile.method,
        headers: { Authorization: `Bearer ${useAuth.user.token}` },
      })
    ).data;
  });
  const handleUpdateEmail = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    axios
      .request({
        url: API + userEndpoints.updateEmail.url,
        method: userEndpoints.updateEmail.method,
        headers: { Authorization: `Bearer ${useAuth.user.token}` },
        data: { email, password: pwd },
      })
      .then((res) => {
        setErrors("");
        setSuccess("email updated successfully");
        useAuth.signout();
        navigate(signin);
      })
      .catch((err: AxiosError<{ error: [string] }>) => {
        setErrors(err.response?.data.error.join("\n") || "");
        console.log(err);
      });
  };
  const handleUpdatePassword = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    axios
      .request({
        url: API + userEndpoints.updatePassword.url,
        method: userEndpoints.updatePassword.method,
        headers: { Authorization: `Bearer ${useAuth.user.token}` },
        data: { oldPassword: pwd, newPassword: newPwd },
      })
      .then((res) => {
        setErrors("");
        setSuccess("password updated successfully");
        useAuth.signout();
        navigate(signin);
      })
      .catch((err: AxiosError<{ error: [string] }>) => {
        setErrors(err.response?.data.error.join("\n") || "");
        console.log(err);
      });
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
                        {status === "success" && (
                          <h6 className="text-muted f-w-400">{data.email}</h6>
                        )}
                      </div>
                      {success && (
                        <div
                          className="alert alert-success success-message"
                          style={{ maxWidth: "300px" }}
                          role="alert"
                        >
                          verification code sent to your email
                        </div>
                      )}
                      {errors && (
                        <div
                          className="row alert alert-danger error-message"
                          style={{ maxWidth: "300px" }}
                          role="alert"
                        >
                          {errors}
                        </div>
                      )}
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
