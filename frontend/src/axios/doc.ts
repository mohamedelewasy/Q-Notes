import { API } from "./client";
import { Doc, docEndpoints } from "@english/shared";
import axios, { AxiosError } from "axios";

export const docListRequest = (
  educationLevel?: string,
  page?: number,
  keyWord?: string
): Promise<{ articles: Doc[]; count: number }> => {
  return axios
    .request({
      url: API + docEndpoints.getDocList.url,
      method: docEndpoints.getDocList.method,
      params: {
        educationLevel,
        page: `${page}`,
        keyWord,
      },
    })
    .then((res) => res.data)
    .catch((err: AxiosError) => {
      const errors = err.response?.data as { error: [string] };
      throw new Error(errors.error.join("\n"));
    });
};

export const docDetailRequest = (id: string) => {
  return axios
    .request({
      url: API + docEndpoints.getDoc.url.replace(":id", id),
      method: docEndpoints.getDoc.method,
    })
    .then((res) => res.data)
    .catch((err: AxiosError) => {
      const errors = err.response?.data as { error: [string] };
      throw new Error(errors.error.join("\n"));
    });
};

export const createDocRequest = async (
  doc: FormData,
  token: string
): Promise<Doc> => {
  return axios
    .request({
      url: API + docEndpoints.createDoc.url,
      method: docEndpoints.createDoc.method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: doc,
    })
    .then((res) => res.data)
    .catch((err: AxiosError) => {
      const errors = err.response?.data as { error: [string] };
      throw new Error(errors.error.join("\n"));
    });
};

export const updateDocRequest = async (
  id: string,
  doc: FormData,
  token: string
): Promise<Boolean> => {
  return axios
    .request({
      url: API + docEndpoints.updateDoc.url.replace(":id", id),
      method: docEndpoints.updateDoc.method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: doc,
    })
    .then((res) => true)
    .catch((err: AxiosError) => {
      const errors = err.response?.data as { error: [string] };
      throw new Error(errors.error.join("\n"));
    });
};

export const deleteDocRequest = async (
  id: string,
  token: string
): Promise<Boolean> => {
  return axios
    .request({
      url: API + docEndpoints.deleteDoc.url.replace(":id", id),
      method: docEndpoints.deleteDoc.method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => true)
    .catch((err: AxiosError) => {
      const errors = err.response?.data as { error: [string] };
      throw new Error(errors.error.join("\n"));
    });
};
