import axios from "axios";
import { IDepartment } from "./properties/IDepartment";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const geDepartmentItems = (state: string, page: Number) => {
  return axios.get(`${baseUrl}${state}/list?page=${page}`);
};

export const getDepartmentItem = (params: { state: string; id: number }) => {
  return axios.get(`${baseUrl}${params.state}/${params.id}`);
};

export const createDepartmentItem = (params: {
  state: string;
  departmentItem: IDepartment;
}) => {
  return axios.post(`${baseUrl}${params.state}`, params.departmentItem);
};

export const updateDepartmentItem = (params: {
  state: string;
  departmentItem: IDepartment;
}) => {
  return axios.patch(
    `${baseUrl}/departments/${params.state}/${params.departmentItem.id}`,
    params.departmentItem
  );
};

export const geDepartmentMasterItems = (params: {
  state: string;
  page: number;
}) => {
  return axios.get(
    `${baseUrl}/department-master/${params.state}/list?page=${params.page}`
  );
};

export const getGrandTotal = (state: string) => {
  return axios.get(`${baseUrl}/department-master/${state}/grand-total`);
};
