import axios, {type AxiosInstance} from "axios"

class HttpProduct {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: "https://dummyjson.com",
      timeout: 10000,
      headers: {
        "Authorization": "application/json"
      }
    })
  } 
};

const httpProduct = new HttpProduct().instance

export default httpProduct;