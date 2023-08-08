import { IDepartment } from './IDepartment';

export interface IMaster {
    id: number;
    item: string;
    manufacturer: string;
    recentCN: string;
    partNumber: string;
    recentVendor: string;
    fisherCN: string;
    vwrCN: string;
    labSourceCN: string;
    otherCN: string;
    purchaseUnit: string;
    unitPrice: number;
    category: string;
    comment: string;
    itemType: string;
    itemGroup: string;
    drugClass: string;
}

export interface IMasterDepartment {
    id: number;
    item: string;
    manufacturer: string;
    recentCN: string;
    partNumber: string;
    recentVendor: string;
    fisherCN: string;
    vwrCN: string;
    labSourceCN: string;
    otherCN: string;
    purchaseUnit: string;
    unitPrice: number;
    category: string;
    comment: string;
    itemType: string;
    itemGroup: string;
    drugClass: string;
    departmentItems: IDepartment[];
}
