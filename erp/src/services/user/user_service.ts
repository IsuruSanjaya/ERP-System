import http from "../../http-common"
import User from "../../models/user_model"

const login = ()=>{
    return http.post<User>("/api/")
}