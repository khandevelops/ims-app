import { IMaster } from "./IMaster";

export interface IRequest {
    item: string;
    recentCN: number;
    department: string;
    status: string;
    quantity: number;
    timeRequested: Date;
    timeUpdated: Date;
    comment: string;
    customText: string;
}

export interface IRequestMaster {
    item: string;
    recentCN: number;
    department: string;
    status: string;
    quantity: number;
    timeRequested: Date;
    timeUpdated: Date;
    comment: string;
    customText: string;
    masterItem: IMaster
}