import axios from "axios";
import { DOMAIN } from "../config/Constant";

export const postAccount = (token,cuenta) => {
    return new Promise((resolve, reject) => {
        axios.post(DOMAIN + "cuenta", cuenta, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token,
            }
        })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
    });
};

export const getListsCuentasByUsuarioId = (token,id) => {
    return new Promise((resolve, reject) => {
      axios
        .get(DOMAIN + "cuenta/"+id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };