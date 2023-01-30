
import http, { post, put } from "../http-common"
import { PhurchaseRequestModel } from "../models/purchase_request"
import companyId from "../config"
import NotificationService from "./notification_servce";
const url = "https://lozzby.herokuapp.com";


const getPurchaseRequests = async (offset: number, pagination: number): Promise<PhurchaseRequestModel[]> => {
   return await http.get(`purchase-request/${companyId.companyId}/${pagination}/${offset}`).then((result) => {
      return result.data.purchaseRequests;
   }).catch(err => {
      console.log(`get purchaseRequests failed ${err}`);
      return [];
   }
   )

}

const updatePurchaseRequest = async (id: string, purchaseRequest: PhurchaseRequestModel) => {
   await put(`${url}/purchase-request/${id}`,
      {
         requestBy: purchaseRequest.requestBy,
         totalBill: purchaseRequest.totalBill,
         status: purchaseRequest.status,
      }
   ).then(result => {
      NotificationService.openNotification("Success","Purchase Request Updated Successfuly")
      return result.status
   });
}

const createPurchaseRequest = async (purchaseRequest: PhurchaseRequestModel) => {


   post(url + "/purchase-request/",
      {
          requestBy: purchaseRequest.requestBy,
         totalBill: purchaseRequest.totalBill,
         status: purchaseRequest.status,
      },
   ).then(result => {
      console.log(result.data);
      NotificationService.openNotification("Success","Purchase Request Created Successfuly")
      return result.status
   }).catch(err => console.log(err));
   // console.log("order created")

}

const deletePurchaseRequest = async (id: string) => {
   console.log("called")
   await http.delete(`purchase-request/${id}`).then(result =>{ 
      NotificationService.openNotification("Success","Purchase Request Deleted Successfuly")
      return result.status
   });
}

const PurchaseRequestService = { getPurchaseRequests, updatePurchaseRequest, createPurchaseRequest, deletePurchaseRequest }

export default PurchaseRequestService