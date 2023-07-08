import axios from 'axios';
import { IMaster } from './properties/IMaster';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getMasterItems = (page: number) => {
    return axios.get(`${baseUrl}/master/list?page=${page}`);
};

export const filterMasterItems = (params: { keyword: string; page: number }) => {
    return axios.get(`${baseUrl}/master/filter?keyword=${params.keyword}&page=${params.page}`);
};

export const createMasterItem = (params: { masterItem: IMaster; departments: string[] }) => {
    return axios.post(`${baseUrl}/master/create`, params);
};

export const updateMasterItem = (masterItem: IMaster) => {
    return axios.patch(`${baseUrl}/master/${masterItem.id}/update`, masterItem);
};

export const assignMasterItem = (params: { masterItemId: number; department: string }) => {
    return axios.patch(`${baseUrl}/master/${params.masterItemId}/${params.department}/assign`);
};

export const getMasterDepartmentItems = (params: { state: string; page: number }) => {
    return axios.get(`${baseUrl}/master-department/${params.state}/list?page=${params.page}`);
};

export const getMasterDepartmentItem = (params: { state: string; id: number }) => {
    return axios.get(`${baseUrl}/master-department/${params.state}/${params.id}`);
};

export const deleteMasterItem = (masterItemId: number) => {
    return axios.delete(`${baseUrl}/master/${masterItemId}/delete`)
}
