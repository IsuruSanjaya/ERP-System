
import http, { post, put } from "../http-common"
import { ItemModel } from "../models/item_model"
import companyId from "../config"
import NotificationService from "./notification_servce";


const url = "https://lozzby.herokuapp.com";


const getDeliveryItems = async (offset: number, pagination: number): Promise<ItemModel[]> => {
   return await http.get(`item-controller/${companyId.companyId}/${pagination}/${offset}`).then((result) => {
      return result.data.items;
   }).catch(err => {
      console.log(`get items failed ${err}`);
      return [];
   }
   )

}

const updateDeliverItem = async (id: string, item: ItemModel) => {
   await put(`${url}/item-controller/${id}`,
      {
         name: item.name,
         price: item.price,
         inStock: item.inStock,
         manufacturer: item.manufacturer,
         supplier: item.supplier,
      }
   ).then(result =>{
      NotificationService.openNotification("Success","Item Updated Successfuly")
      return result.status
   });
}

const createDeliveryItem = async (item: ItemModel) => {


   post(url + "/item-controller",
      {
         name: item.name,
         price: item.price,
         inStock: item.inStock,
         manufacturer: item.manufacturer,
         supplier: item.supplier,
         companyId: item.companyId
      },
   ).then(result => {
      console.log(result.data);
      NotificationService.openNotification("Success","Item Craeted Successfuly")
      return result.status
   }).catch(err => console.log(err));
   // console.log("order created")

}

const deleteDeliveryItem = async (id: string) => {
   console.log("called")
   await http.delete(`item-controller/${id}`).then(result =>{ 
      NotificationService.openNotification("Success","Item Deleted Successfuly")
      return result.status
   });
}


const ItemService = { getDeliveryItems, updateDeliverItem, createDeliveryItem, deleteDeliveryItem }

export default ItemService