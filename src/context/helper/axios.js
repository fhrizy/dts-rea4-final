import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_END_POINT;
const api_key = process.env.REACT_APP_IMDB_API_KEY;

export const http_get = (url, params = {}) => {
  return axios.get(url, { params: { api_key, ...params } });
};

export const http_post = (url, params = {}) => {
  return axios.post(url, { params: { api_key, ...params } });
};

export const http_delete = (url, params = {}) => {
  return axios.delete(url, { params: { api_key, ...params } });
};

export const http_put = (url, params = {}) => {
  return axios.put(url, { params: { api_key, ...params } });
};
