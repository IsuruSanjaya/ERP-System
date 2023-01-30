import { NextFunction, Request, Response } from 'express';
import purchase_request_model from '../models/purchase_request';


const createPurchaseRequest = (req: Request, res: Response, next: NextFunction) => {
   const { requestBy, totaBill, status } = req.body;

   const PurchaseRequest = new purchase_request_model(
      {
         requestBy, totaBill, status
      })

   return PurchaseRequest.save().then((order) => res.status(201).json(order)).catch(error => res.status(500).json({ error }))

}
const updatePurchaseRequest = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return purchase_request_model.findById(id).then((order) => {
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
const getPurchaseRequests = (req: Request, res: Response, next: NextFunction) => {
   const companyID: string = req.params.id;
   const offset: number = parseInt(req.params.offset);
   const page: number = parseInt(req.params.page);

   const query = { companyId: companyID }

   return purchase_request_model
      .find(query).skip(page * page)
      .limit(offset)
      .then((orders) => res.status(200).json({ orders }))
      .catch(error => res.status(500).json({ error }))


}
const deletePurchaseRequest = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return purchase_request_model.findByIdAndDelete(id)
      .then(() => res.status(201).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
}

const getPurchaseRequestById = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return purchase_request_model
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

export default { createPurchaseRequest, updatePurchaseRequest, getPurchaseRequests, getPurchaseRequestById, deletePurchaseRequest }