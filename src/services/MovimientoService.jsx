import axios from "axios";
import { DOMAIN } from "../config/Constant";

export const postIngreso = (token,movimiento) => {
    return new Promise((resolve, reject) => {
        axios.post(DOMAIN + "movimiento/ingreso", movimiento, {
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
export const postEgreso = (token,movimiento) => {
    return new Promise((resolve, reject) => {
        axios.post(DOMAIN + "movimiento/egreso", movimiento, {
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

export const getMovimientoCuentaId = (token,id) => {
    return new Promise((resolve, reject) => {
      axios
        .get(DOMAIN + "movimiento/cuenta/"+id, {
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

  export const getMovimientoCategoriaId = (token,id) => {
    return new Promise((resolve, reject) => {
      axios
        .get(DOMAIN + "movimiento/categoria/"+id, {
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