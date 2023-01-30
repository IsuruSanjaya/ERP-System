import { NextFunction, Request, Response } from 'express';
import purchase_order_model from '../models/purchase_order_model';


const createPurchaseOrder = (req: Request, res: Response, next: NextFunction) => {
   const { date, purchaseOrderDate, suppierName, store,  netAmount, status,companyId } = req.body;

   const PurchaseOrder = new purchase_order_model(
      {
         date, purchaseOrderDate, suppierName, store, netAmount, status,companyId
      })

   return PurchaseOrder.save().then((order) => res.status(201).json(order)).catch(error => res.status(500).json({ error }))

}
const updatePurchaseOrder = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return purchase_order_model.findById(id).then((order) => {
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
const getPurchaseOrders = (req: Request, res: Response, next: NextFunction) => {
   const companyID: string = req.params.id;
   const offset: number = parseInt(req.params.offset);
   const page: number = parseInt(req.params.page);

   const query = { companyId: companyID }

   return purchase_order_model
      .find(query).skip(page * page)
      .limit(offset)
      .then((orders) => res.status(200).json({ orders }))
      .catch(error => res.status(500).json({ error }))


}
const deletePurchaseOrder = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return purchase_order_model.findByIdAndDelete(id)
      .then(() => res.status(201).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
}

const getPurchaseOrderById = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return purchase_order_model
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

export default { createPurchaseOrder, updatePurchaseOrder, getPurchaseOrders, getPurchaseOrderById, deletePurchaseOrder }