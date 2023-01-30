export interface PhurchaseOrderModel {
    _id?: string,
    purchaseOrderDate: Date,
    suppierName: string,
    store: string,
    netAmount: number,
    status: boolean,
    companyId: string,
}