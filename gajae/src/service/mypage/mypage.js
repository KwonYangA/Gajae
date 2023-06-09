import axios from 'axios';

export const myReservation = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: 'get',
        url: process.env.REACT_APP_SPRING_IP + 'mypage/myReservation',
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const myResDelete = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: 'get',
        url: process.env.REACT_APP_SPRING_IP + 'mypage/myResDelete',
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};