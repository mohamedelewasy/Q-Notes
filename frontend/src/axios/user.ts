import { API } from "./client";
import { userEndpoints } from "@english/shared";
import axios, { AxiosError } from "axios";

export const signinRequest = (
  email: string,
  password: string
): Promise<{ token: string }> => {
  return axios
    .request({
      url: API + userEndpoints.signin.url,
      method: userEndpoints.signin.method,
      data: { email, password },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err: AxiosError) => {
      const errors = err.response?.data as { error: [string] };
      throw new Error(errors.error.join("\n"));
    });
};

export const signupRequest = (
  email: string,
  password: string
): Promise<{ token: string }> => {
  return axios
    .request({
      url: API + userEndpoints.signup.url,
      method: userEndpoints.signup.method,
      data: { email, password },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err: AxiosError) => {
      const errors = err.response?.data as { error: [string] };
      throw new Error(errors.error.join("\n"));
    });
};

export const signoutRequest = (token: string): Promise<boolean> => {
  return axios
    .request({
      url: API + userEndpoints.signout.url,
      method: userEndpoints.signout.method,
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => true)
    .catch((err) => {
      throw new Error("server error");
    });
};

export const profileRequest = (
  token: string
): Promise<{ email: string; isAdmin: boolean }> => {
  return axios
    .request({
      url: API + userEndpoints.profile.url,
      method: userEndpoints.profile.method,
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err: AxiosError) => {
      const errors = err.response?.data as { error: [string] };
      throw new Error(errors.error.join("\n"));
    });
};

export const updateEmailRequest = (
  email: string,
  password: string,
  token: string
) => {
  return axios
    .request({
      url: API + userEndpoints.updateEmail.url,
      method: userEndpoints.updateEmail.method,
      headers: { Authorization: `Bearer ${token}` },
      data: { email, password },
    })
    .then((res) => true)
    .catch((err: AxiosError) => {
      const errors = err.response?.data as { error: [string] };
      throw new Error(errors.error.join("\n"));
    });
};

export const updatePasswordRequest = (
  oldPassword: string,
  newPassword: string,
  token: string
) => {
  return axios
    .request({
      url: API + userEndpoints.updatePassword.url,
      method: userEndpoints.updatePassword.method,
      headers: { Authorization: `Bearer ${token}` },
      data: { oldPassword, newPassword },
    })
    .then((res) => true)
    .catch((err: AxiosError) => {
      const errors = err.response?.data as { error: [string] };
      throw new Error(errors.error.join("\n"));
    });
};

export const verifyRequest = (
  verificationCode: string,
  token: string
): Promise<Boolean> => {
  return axios
    .request({
      url: API + userEndpoints.verify.url.replace(":code", verificationCode),
      method: userEndpoints.verify.method,
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => true)
    .catch((err: AxiosError) => {
      const errors = err.response?.data as { error: [string] };
      throw new Error(errors.error.join("\n"));
    });
};
