import axios from "axios"
import { IMaster } from "./properties/IMaster"

const baseUrl = process.env.REACT_APP_BASE_URL

export const getMasterItems = (params: { page: number }) => {
    return axios.get(`${baseUrl}/master/list?page=${params.page}`)
}

export const getMasterFilterItems = (params: { item: string, page: number, size: number }) => {
    return axios.get(`${baseUrl}/master/list/filter?item=${params.item}&page=${params.page}&size=${params.size}`)
}

export const createMasterItem = (params: { masterItem: IMaster, departments: string[] }) => {
    return axios.post(`${baseUrl}/master/create`, params)
}

export const updateMasterItem = (masterItem: IMaster) => {
    return axios.put(`${baseUrl}/${masterItem.id}`, masterItem)
}

export const updateMasterItemAssign = (params: { masterItemId: number, department: string }) => {
    return axios.put(`${baseUrl}/${params.masterItemId}`, params)
}


export const getMasterDepartmentItems = (params: { state: string, page: number }) => {
    return axios.get(`${baseUrl}/master-department/${params.state}/list?page=${params.page}`)
}

export const getMasterDepartmentItem = (params: { state: string, id: number }) => {
    return axios.get(`${baseUrl}/master-department/${params.state}/${params.id}`)
}