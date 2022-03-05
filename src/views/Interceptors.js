import React from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';


const Interceptors = (props) => {
  let pathname = useLocation().pathname;
  const navigate = useNavigate();
  const createAxiosResponseInterceptor = () => {
    const interceptor = axios.interceptors.response.use((response) => response, (error) => {
      if (error.response?.status !== 401) {
        return Promise.reject(error);
      }
      axios.interceptors.response.eject(interceptor);
      return (
        axios.post(`${process.env.REACT_APP_API_URL}/auth/reset`)
          .then((response) => {
            return axios(error.response?.config);
          })
          .catch((error) => {
            if (error.response.status === 403 && !(/^\/login[/]{0,1}$/).test(pathname)) navigate('/login');
            return Promise.reject(error);
          })
          .finally(createAxiosResponseInterceptor)
      );
    })
  }
  createAxiosResponseInterceptor();

  return (
    <>{ props.children } </>
  )
}

export default Interceptors