import { API } from "./client";
import { Doc, docEndpoints } from "@english/shared";
import axios, { AxiosError } from "axios";

// export const profileRequest = (token: string): Promise<{ email: string }> => {
//   return axios
//     .request({
//       url: API + userEndpoints.profile.url,
//       method: userEndpoints.profile.method,
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((res) => res.data)
//     .catch((err: AxiosError) => {
//       const errors = err.response?.data as { error: [string] };
//       throw new Error(errors.error.join("\n"));
//     });
// };

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
