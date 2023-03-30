export interface IRequestItem {
    id: number,
    order_quantity: number,
    department: string,
    status: string,
    location: string,
    time_requested: Date,
    time_updated: Date,
    confirmation: string,
    user: string,
    comment: string,
    custom_text: string
}