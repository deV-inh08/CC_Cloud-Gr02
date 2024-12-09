import axios, { AxiosError, type AxiosInstance } from "axios";
import { getAccessTokenFromLS, saveAccessTokenToLS } from "./auth";
import { paths } from "../constants/paths";
import { AuthResponse } from "../types/auth.type";

class HttpAuth {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: "http://localhost:3055/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    this.instance.interceptors.request.use((config) => {
      if(this.accessToken) {
        config.headers.Authorization = `${this.accessToken}`
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
          saveAccessTokenToLS(this.accessToken)
        } else if(url === paths.logout) {
           this.accessToken = ""
        }
      }
    )
  }


};

const httpAuth = new HttpAuth().instance;
export default httpAuth;