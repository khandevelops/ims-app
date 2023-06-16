import { IDepartment } from "./IDepartment";

export interface IMaster {
    id: number;
    item: string;
    manufacturer: string
    recent_cn: string
    part_number: string
    recent_vendor: string
    fisher_cn: string
    vwr_cn: string
    lab_source_cn: string
    other_cn: string
    purchase_unit: string;
    unit_price: number;
    category: string;
    comment: string;
    type: string;
    group: string;
    drug_class: string;
}

export interface IMasterDepartment {
    id: number;
    item: string;
    manufacturer: string
    recent_cn: string
    part_number: string
    recent_vendor: string
    fisher_cn: string
    vwr_cn: string
    lab_source_cn: string
    other_cn: string
    purchase_unit: string;
    unit_price: number;
    category: string;
    comment: string;
    type: string;
    group: string;
    drug_class: string;
    departmentItems: IDepartment[]
}