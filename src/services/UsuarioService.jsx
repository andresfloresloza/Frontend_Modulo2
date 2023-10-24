import axios from "axios";
import { DOMAIN } from "../config/Constant";

export const postRegister = (usuario) => {
    return new Promise((resolve, reject) => {
        axios.post(DOMAIN + "usuario/register", usuario, {
            headers: {
                'Content-Type': 'application/json',
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

export const postLogin = (usuario) => {
    return new Promise((resolve, reject) => {
        axios.post(DOMAIN + "usuario/login",usuario, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
                reject(error);
            });
    });
}

export const getByUsuarioId = (token,id) => {
    return new Promise((resolve, reject) => {
      axios
        .get(DOMAIN + "usuario/"+id, {
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