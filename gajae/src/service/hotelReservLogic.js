import axios from "axios";

// 룸타입가져오기
export const hotelDetailDB = (hotel) => {
  console.log(hotel);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "hotel/hotelDetail",
        params: hotel,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const checkVacancyDB = (checkRoom) => {
  console.log(checkRoom);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "hotel/checkVacancy",
        data: checkRoom,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
