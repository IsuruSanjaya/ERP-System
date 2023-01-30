
import http, { post, put } from "../http-common"
import { StockOrderModel } from "../models/stock_order_model"
import companyId from "../config"
import NotificationService from "./notification_servce";
const url = "https://lozzby.herokuapp.com";


const getOrderQty = async (offset: number, pagination: number): Promise<StockOrderModel[]> => {
   return await http.get(`stock-order-controller/${companyId.companyId}/${pagination}/${offset}`).then((result) => {
      return result.data.orders;
   }).catch(err => {
      console.log(`get items failed ${err}`);
      return [];
   }
   )
}

const updateOrderQty = async (id: string, item: StockOrderModel) => {
 await put(`${url}/stock-order-controller/${id}`,
      {
        name: item.name,
        price: item.price,
        manufacturer: item.manufacturer,
        orderqty: item.orderqty,
      }
   ).then(result => {
      NotificationService.openNotification("Success","Stock Updated Successfuly")
      return result.status
   });
}

const createStockQty = async (item: StockOrderModel) => {


   post(url + "/stock-order-controller",
      {
         name: item.name,
         price: item.price,
         manufacturer: item.manufacturer,
         orderqty: item.orderqty,
      },
   ).then(result => {
      console.log(result.data);
      NotificationService.openNotification("Success","Stock Created Successfuly")
      return result.status
   }).catch(err => console.log(err));
   // console.log("order created")
}

const deleteOrderQty = async (id: string) => {
   await http.delete(`stock-order-controller/${id}`).then(result => {
      NotificationService.openNotification("Success","Stock Deleted Successfuly")
      return result.status
   });
}

const StockOrderService = { getOrderQty, updateOrderQty, createStockQty, deleteOrderQty }

export default StockOrderService