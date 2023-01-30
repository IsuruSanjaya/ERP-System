
import http, { post, put } from "../http-common"
import { DeliveryOrderModel } from "../models/delivery_order_model"
import companyId from "../config"
import NotificationService from "./notification_servce";
const url = "https://lozzby.herokuapp.com";


const getDeliveryItems = async (offset: number, pagination: number): Promise<DeliveryOrderModel[]> => {
   return await http.get(`delivery-order/${companyId.companyId}/${pagination}/${offset}`).then((result) => {
      return result.data.orders;
   }).catch(err => {
      console.log(`get delivery orders failed ${err}`);
      return [];
   }
   )

}

const updateDeliverItem = async (id: string, deliveryOrder: DeliveryOrderModel) => {
   await put(url + `/delivery-order/update-delivery-order/${id}`,
      {
         date: deliveryOrder.date,
         transactionDate: deliveryOrder.transactionDate,
         transactionType: deliveryOrder.transactionType,
         coustomer: deliveryOrder.coustomer,
         shippingAddress: deliveryOrder.shippingAddress,
         totalBill: deliveryOrder.totalBill,
         status: deliveryOrder.status,
         customerType: "a",
         companyId: deliveryOrder.companyId,
      }
   ).then(result =>{
      NotificationService.openNotification("Success","Delivery Item Updated Successfuly")
      return result.status 
   } );
}

const createDeliveryItem = async (deliveryOrder: DeliveryOrderModel) => {


   post(url + "/delivery-order/create-delivery-order",
      {
         date: deliveryOrder.date,
         transactionDate: deliveryOrder.transactionDate,
         transactionType: deliveryOrder.transactionType,
         coustomer: deliveryOrder.coustomer,
         shippingAddress: deliveryOrder.shippingAddress,
         totalBill: deliveryOrder.totalBill,
         status: deliveryOrder.status,
         customerType: "a",
         companyId: deliveryOrder.companyId,
      },
   ).then(result => {
      NotificationService.openNotification("Success","Delivery Item Created Successfuly")
      return result.status
      //console.log(result.data)
   }).catch(err => console.log(err));
   // console.log("order created")

}

const deleteDeliveryItem = async (id: string) => {
   await http.delete(`delivery-order/delete-delivery-order/${id}`).then(result =>{

      NotificationService.openNotification("Success","Delivery Item Deleted Successfuly")
      return result.status 
   });
}

const DeliveryOrderService = { getDeliveryItems, updateDeliverItem, createDeliveryItem, deleteDeliveryItem }

export default DeliveryOrderService