import axios from "axios";
import { DOMAIN } from "../config/Constant";

export const postMovimiento = (token,movimiento) => {
    return new Promise((resolve, reject) => {
        axios.post(DOMAIN + "movimiento/insert", movimiento, {
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

export const actualizarMovimiento = (token,movimiento) => {
  return new Promise((resolve, reject) => {
      axios.put(DOMAIN + "movimiento/update", movimiento, {
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

export const deleteMovimiento = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(DOMAIN + "movimiento/delete", {
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

export const getMovimientoId = (token,id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(DOMAIN + "movimiento/"+id, {
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