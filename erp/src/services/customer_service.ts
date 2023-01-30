
import http, { post, put } from "../http-common"
import { CustomeModel } from "../models/customer_model"
import companyId from "../config"
import NotificationService from "./notification_servce";
const url = "https://lozzby.herokuapp.com";


const getCustomers = async (offset: number, pagination: number): Promise<CustomeModel[]> => {
   return await http.get(`customer/${companyId.companyId}/${pagination}/${offset}`).then((result) => {
      return result.data.customers;
   }).catch(err => {
      console.log(`get sales orders failed ${err}`);
      return [];
   }
   )

}

const updateCustomer = async(id: string, Customer: CustomeModel) => {
  await put(url + `/customer/update-customer/${id}`,
      {
         date: Customer.date,
         name: Customer.name,
         nic: Customer.nic,
         mobile: Customer.mobile,
         email: Customer.email,
         address: Customer.address,

         companyId: Customer.companyId,
      }
   ).then(result => {
      NotificationService.openNotification("Success","Customer Updated Successfuly")
      return result.status 
      
   });
}

const createCustomer = async (Customer: CustomeModel) => {
 

   post(url + "/customer/create-customer",
      {
         date: Customer.date,
         name: Customer.name,
         nic: Customer.nic,
         mobile: Customer.mobile,
         email: Customer.email,
         address: Customer.address,
         companyId: Customer.companyId,
      }
   ).then(result => {
      NotificationService.openNotification("Success","Customer Created Successfuly")
      console.log(result.data);
      return result.status;
   }).catch(err => console.log(err));
   // console.log("order created")

}

const deleteCustomer = async (id: string) => {
   await http.delete(`customer/delete-customer/${id}`).then(result =>{
      NotificationService.openNotification("Success","Customer Deleted Successfuly")
      return result.status 
   });
}

const CustomerService = { getCustomers, updateCustomer, createCustomer, deleteCustomer }

export default CustomerService