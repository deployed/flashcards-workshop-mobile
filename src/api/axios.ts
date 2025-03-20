import Axios from 'axios';

export const axios = Axios.create({
  baseURL: `http://192.168.0.122:8000/api/`,
});
