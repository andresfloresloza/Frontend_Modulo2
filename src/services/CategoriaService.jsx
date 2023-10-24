import axios from "axios";
import { DOMAIN } from "../config/Constant";

export const postCategory = (token,categoria) => {
    return new Promise((resolve, reject) => {
        axios.post(DOMAIN + "categoria", categoria, {
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

export const getListsCategoriasByUsuarioId = (token,id) => {
    return new Promise((resolve, reject) => {
      axios
        .get(DOMAIN + "categoria/"+id, {
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