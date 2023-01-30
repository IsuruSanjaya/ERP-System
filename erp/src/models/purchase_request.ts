export interface PhurchaseRequestModel {
  _id?: string,
  requestBy: string,
  totalBill: number,
  status: boolean,
  requestTo: string,
  requestToId: string,
}