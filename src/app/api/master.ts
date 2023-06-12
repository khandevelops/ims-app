import axios from "axios"
import { IMaster } from "../properties/IMaster"

const baseUrl = process.env.REACT_APP_BASE_URL

export const getMasterItems = (params: { page: number }) => {
    return axios.get(`${baseUrl}/master/list?page=${params.page}`)
}

export const getMasterFilterItems = (params: { item: string, page: number, size: number }) => {
    return axios.get(`${baseUrl}/master/list/filter?item=${params.item}&page=${params.page}&size=${params.size}`)
}

export const createMasterItem = (params: { state: string, masterItem: IMaster }) => {
    return axios.post(`${baseUrl}${params.state}`, params.masterItem)
}

export const updateMasterItem = (params: { id: number, masterItem: IMaster }) => {
    return axios.put(`${baseUrl}/${params.id}`, params.masterItem)
}


export const getMasterDepartmentItems = (params: { state: string, page: number }) => {
    return axios.get(`${baseUrl}/master-department/${params.state}/list?page=${params.page}`)
}

export const getMasterDepartmentItem = (params: { state: string, id: number }) => {
    return axios.get(`${baseUrl}/master-department/${params.state}/${params.id}`)
}