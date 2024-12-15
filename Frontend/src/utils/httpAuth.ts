import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from "axios";
import { clearLocalStorage, getAccessTokenFromLS, getRefreshTokenFromLS, saveAccessTokenToLS, saveRefreshTokenToLS } from "./auth";
import { paths } from "../constants/paths";
import { AuthResponse } from "../types/auth.type";
import { toast } from "react-toastify";

class HttpAuth {
  instance: AxiosInstance
  private accessToken: string
  private refreshtoken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshtoken = getRefreshTokenFromLS()
    this.instance = axios.create({
      baseURL: "https://20241213t120348-dot-nlu-gcp-hk241-group01.de.r.appspot.com/users",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    this.instance.interceptors.request.use((config) => {   
      if(this.accessToken) {
        config.headers.Authorization = `Bearer ${this.accessToken}`
        config.headers.Authorization = this.refreshtoken
        return config
      }
      return config
    }, (error) => {
      return Promise.reject(error)
    });
    
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if(url === paths.signup || url === paths.signin) {
          this.accessToken = (response.data as AuthResponse).data?.access_token as string
          this.refreshtoken = (response.data as AuthResponse).data?.refresh_token as string
          saveAccessTokenToLS(`Bearer ${this.accessToken}`)
          saveRefreshTokenToLS(this.refreshtoken)
        } else if(url === paths.logout) {
           this.accessToken = ""
           this.refreshtoken = ""
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

