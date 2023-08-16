import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getRequestMasterItems = (pathName: string, page: number) => {
    return axios.get(`${baseUrl}${pathName}/list?page=${page}`);
};