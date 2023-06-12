import { IMaster } from "./IMaster"

export interface IDepartment {
    id: number,
    location: string,
    quantity: number,
    minimum_quantity: number,
    maximum_quantity: number,
    usage_level: string,
    lot_number: string,
    expiration_date: Date,
    received_date: Date
}

export interface IDepartmentMaster {
    id: number,
    location: string,
    quantity: number,
    minimum_quantity: number,
    maximum_quantity: number,
    usage_level: string,
    lot_number: string,
    expiration_date: Date,
    received_date: Date,
    masterItem: IMaster
}