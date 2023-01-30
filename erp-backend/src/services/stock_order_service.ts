
import { NextFunction, Request, Response } from 'express';
import stock_order_model from '../models/stock_order_model';


const createStockOrder = (req: Request, res: Response, next: NextFunction) => {
   const { name,price,manufacturer,orderqty } = req.body;

   const StockOrder = new stock_order_model(
      {
         name,
         price,
         manufacturer,
         orderqty,
      })

   return StockOrder.save().then((order) => res.status(201).json(order)).catch(error => res.status(500).json({ error }))

}
const updateStockOrder = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return stock_order_model.findById(id).then((order) => {
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
const getStockOrders = (req: Request, res: Response, next: NextFunction) => {
   const companyID: string = req.params.id;
   const offset: number = parseInt(req.params.offset);
   const page: number = parseInt(req.params.page);

   const query = { companyId: companyID }

   return stock_order_model
      .find(query).skip(page * page)
      .limit(offset)
      .then((orders) => res.status(200).json({ orders }))
      .catch(error => res.status(500).json({ error }))


}
const deleteStockOrder = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return stock_order_model.findByIdAndDelete(id)
      .then(() => res.status(201).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
}

const getStockOrderById = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return stock_order_model
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

export default { createStockOrder, updateStockOrder, getStockOrders, getStockOrderById, deleteStockOrder }