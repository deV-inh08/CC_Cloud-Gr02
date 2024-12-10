import httpAuth from "../utils/httpAuth";

const authAPI = {
  signupAccount: (body: {email: string, password: string}) => {
    return httpAuth.post('/signup', body)
  },

  logoutAccount: () => {
    return httpAuth.post('/logout')
  }
}

export default authAPI