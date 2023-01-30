
import http, { post, put } from "../http-common"
import { PhurchaseOrderModel } from "./../models/purchase_order"
import companyId from "../config"
import NotificationService from "./notification_servce";
const url = "https://lozzby.herokuapp.com";


const getPurchaseOrders = async (offset: number, pagination: number): Promise<PhurchaseOrderModel[]> => {
   return await http.get(`purchase-order/${companyId.companyId}/${pagination}/${offset}`).then((result) => {

      return result.data.orders;
   }).catch(err => {
      console.log(`get purchase orders failed ${err}`);
      return [];
   }
   )

}

const updatePurchaseOrder = async (id: string, purchaseOrder: PhurchaseOrderModel) => {
   await put(`${url}/purchase-order/update-purchase-order/${id}`,
      {
         purchaseOrderDate: purchaseOrder.purchaseOrderDate,
         suppierName: purchaseOrder.suppierName,
         store: purchaseOrder.store,
         netAmount: purchaseOrder.netAmount,
         status: purchaseOrder.status,
         companyId: purchaseOrder.companyId,
      }
   ).then(result => {
      NotificationService.openNotification("Success","Purchase Order Updated Successfuly")
      return result.status
   });
}

const createDeliveryItem = async (purchaseOrder: PhurchaseOrderModel) => {
   await post(url + "/purchase-order/create-purchase-order",
      {
         purchaseOrderDate: purchaseOrder.purchaseOrderDate,
         suppierName: purchaseOrder.suppierName,
         store: purchaseOrder.store,
         netAmount: purchaseOrder.netAmount,
         status: purchaseOrder.status,
         companyId: purchaseOrder.companyId,
      },
   ).then(result => {
      console.log(result.data);
      NotificationService.openNotification("Success","Purchase Order Created Successfuly")
      return result.status
   }).catch(err => console.log(err));
   // console.log("order created")

}

const deleteDeliveryItem = async (id: string) => {
   await http.delete(`purchase-order/delete-purchase-order/${id}`).then(result => {
      NotificationService.openNotification("Success","Purchase Order Deleted Successfuly")
      return result.status
   });
}

const PurchaseOrderService = { getPurchaseOrders, updatePurchaseOrder, createDeliveryItem, deleteDeliveryItem }

export default PurchaseOrderService