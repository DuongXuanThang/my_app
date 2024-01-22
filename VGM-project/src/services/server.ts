import axios from "axios";

let AxiosService:any = axios;
console.log(import.meta.env.VITE_BASE_URL);

if (import.meta.env.VITE_BASE_URL) {
  console.log('vao day');
  
  AxiosService = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });
  AxiosService.interceptors.request.use(
    function (config) {
      const authString = `Basic ${btoa(`${import.meta.env.VITE_AUTH_KEY}:${import.meta.env.VITE_AUTH_SECRET}`)}`
      config['headers']['Authorization'] =authString
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  
}
AxiosService.interceptors.response.use(
  function (response) {
    console.log("response",response);
    
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export { AxiosService };
