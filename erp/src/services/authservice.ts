import axios from "axios"

const url = "https://lozzby.herokuapp.com";

const login = async (email: string, password: string) => {
   return await axios.post(`${url}/auth/login`,
      {
         email, password
      })

      .then(result => {
         return result.status;
      })
      .catch(err => console.log("error " + err))
}

const AuthService = { login }

export default AuthService