import { NextFunction, Request, Response } from 'express';
import delivery_order_model from '../models/delivery_order_model';


const createDeliveryOrder = (req: Request, res: Response, next: NextFunction) => {  

   const { date, transactionDate, transactionType, coustomer, shippingAddress, totalBill, status, companyId,customerType } = req.body;

   const deliveryOrder = new delivery_order_model(
      {
         date, transactionDate, transactionType, coustomer, shippingAddress, totalBill, status, companyId,customerType
      })

   return deliveryOrder.save().then((order) => res.status(201).json(order)).catch(error => res.status(500).json({ error }))

}
const updateDeliveryOrder = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return delivery_order_model.findById(id).then((order) => {
      if (order) {
         return order.set(req.body)
            .save().then((order) => res.status(201)
               .json({ order }))
            .catch(error => res.status(500).json({ error }))
      } else {
         return res.status(404).json({ "message": "order not found" })
      }
   }).catch(error => res.status(500).json({ error }))

}
const getDeliveryOrders = (req: Request, res: Response, next: NextFunction) => {
   const companyID: string = req.params.id;
   const offset: number = parseInt(req.params.offset);
   const page: number = parseInt(req.params.page);

   const query = { companyId: companyID }

   return delivery_order_model
      .find(query).skip(page * page)
      .limit(offset)
      .then((orders) => res.status(200).json({ orders }))
      .catch(error => res.status(500).json({ error }))


}
const deleteDeliveryOrder = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return delivery_order_model.findByIdAndDelete(id)
      .then(() => res.status(201).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
}

const getDeliveryOrderById = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return delivery_order_model
      .findById(id)
      .then((order) => {
         if (order) {
            return res.status(200).json({
               order
            })
         } else {
            return res.status(404).json({ "message": "order not found" })
         }
      })
      .catch(error => res.status(500).json({ error }))
}

export default { createDeliveryOrder, updateDeliveryOrder, getDeliveryOrders, getDeliveryOrderById, deleteDeliveryOrder }