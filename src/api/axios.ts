import axios from 'axios';

const customInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

customInstance.interceptors.response.use(
  response => response,
  // ---------Add this after the refresh token API is ready---------
  error => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    if (status === 401) {
      if (originalRequest.url === `/realm/${process.env.REACT_APP_REALM}/clients`) {
        return Promise.reject(error);
      }
      // if (!retryAPI) {
      // const retryOrigReq = new Promise(resolve => {
      //   subscribeTokenRefresh((newToken: string) => {
      //     // replace the expired token and retry
      //     originalRequest.headers.Authorization = `Bearer ${newToken}`
      //     resolve(axios(originalRequest))
      //   })
      // })
      // return retryOrigReq
      // }
      // if (retryAPI) {
      //   originalRequest.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
      //   return axios(originalRequest)
      //     .then(res => res)
      //     .catch(err => Promise.reject(err))
      // }
    }
    return Promise.reject(error);
  },
  // -------------------------------------------------------------
);

export default customInstance;
