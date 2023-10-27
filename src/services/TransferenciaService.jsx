import axios from "axios";
import { DOMAIN } from "../config/Constant";

export const postTransferencia = (token,transferencia) => {
    return new Promise((resolve, reject) => {
        axios.post(DOMAIN + "transferencia/insert", transferencia, {
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

export const deleteTransferencia = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(DOMAIN + "transferencia/delete", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        data: { id: id },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getTransferenciaCuentaId = (token,id) => {
    return new Promise((resolve, reject) => {
      axios
        .get(DOMAIN + "transferencia/cuenta/"+id, {
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