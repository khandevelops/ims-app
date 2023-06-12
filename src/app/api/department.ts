import axios from "axios"
import { IDepartment } from "../properties/IDepartment"

const baseUrl = process.env.REACT_APP_BASE_URL

export const geDepartmentItems = (state: string, page: Number) => {
    return axios.get(`${baseUrl}${state}/list?page=${page}`)
}

export const getDepartmentItem = (params: { state: string, id: number }) => {
    return axios.get(`${baseUrl}${params.state}/${params.id}`)
}

export const createDepartmentItem = (params: { state: string, departmentItem: IDepartment }) => {
    return axios.post(`${baseUrl}${params.state}`, params.departmentItem)
}

export const updateDepartmentItem = (params: { state: string, id: number, departmentItem: IDepartment }) => {
    return axios.put(`${baseUrl}${params.state}/${params.id}`, params.departmentItem)
}


export const geDepartmentMasterItems = (params: { state: string, page: number }) => {
    return axios.get(`${baseUrl}/master-department/${params.state}/list?page=${params.page}`)
}