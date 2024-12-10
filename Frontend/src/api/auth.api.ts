import httpAuth from "../utils/httpAuth";

const authAPI = {
  signupAccount: (body: {email: string, password: string}) => {
    return httpAuth.post('/signup', body)
  },

  logoutAccount: (body: {access_token: string, refresh_token: string}) => {
    return httpAuth.post('/logout', body)
  }
}

export default authAPI