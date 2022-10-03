import axios from "axios";
import { BASE_URL } from "../constants";

const instance = axios.create({
  baseURL: BASE_URL,
});

const sendRequest = (config) => {
  return instance.request(config);
};

export const postTokenReq = (path, token) => {
  return sendRequest({
    method: "post",
    url: path,
    headers: {
      Authorization: token,
    },
  });
};

export const getUserDetails = (path, token) => {
  return sendRequest({
    method: "get",
    url: path,
    headers: {
      Authorization: token,
    },
  })
}