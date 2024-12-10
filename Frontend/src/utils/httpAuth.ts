import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from "axios";
import { clearLocalStorage, getAccessTokenFromLS, saveAccessTokenToLS } from "./auth";
import { paths } from "../constants/paths";
import { AuthResponse } from "../types/auth.type";
import { toast } from "react-toastify";

class HttpAuth {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: "http://localhost:3055/users/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    this.instance.interceptors.request.use((config) => {      
      if(this.accessToken) {
        config.headers.Authorization = `Bearer ${this.accessToken}`
        return config
      }
      return config
    }, (error) => {
      return Promise.reject(error)
    });
    
    this.instance.interceptors.response.use(
      (response) => {
        console.log(response)
        const { url } = response.config
        if(url === paths.signup || url === paths.signin) {
          this.accessToken = (response.data as AuthResponse).data?.access_token as string
          saveAccessTokenToLS(this.accessToken)
        } else if(url === paths.logout) {
           this.accessToken = ""
           clearLocalStorage()
        }
        return response
      },
      function(error: AxiosError) {
        if(
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          const data = error.response?.data
          const message: string = data.message || error.message
          toast.error(message, { autoClose: 1000 })
        }
        if(error.response?.status === HttpStatusCode.Unauthorized) {
          clearLocalStorage()
      }
      return Promise.reject(error)
      }
    )
  }
};

const httpAuth = new HttpAuth().instance;
export default httpAuth;