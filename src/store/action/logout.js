import axios from "axios";
import Types from "../type";

const LogoutApi = (token) => {

   
  axios
    .post(url + "user/logoutAll", { Authorization: `Bearer ${token}` })
    .then((res) => {
      console.log(res);
        
    });
};
