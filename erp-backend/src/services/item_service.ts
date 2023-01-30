import { NextFunction, Request, Response } from 'express';
import item_model from '../models/item_model';


const createitem = (req: Request, res: Response, next: NextFunction) => {
   const {
      name,
      inStock,
      manufacturer,
      companyId,
      supplier,
      price
   } = req.body;

   const item = new item_model(
      {
         name,
         inStock,
         manufacturer,
         companyId,
         supplier,
         price
      })

   return item.save().then((item) => res.status(201).json(item)).catch(error => res.status(500).json({ error }))

}
const updateitem = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return item_model.findById(id).then((item) => {
      if (item) {
         return item.set(req.body)
            .save().then((item) => res.status(201)
               .json({ item }))
            .catch(error => res.status(500).json({ error }))
      } else {
         return res.status(404).json({ "message": "item not found" })
      }
   }).catch(error => res.status(500).json({ error }))

}
const getitems = (req: Request, res: Response, next: NextFunction) => {
   const companyID: string = req.params.id;
   const offset: number = parseInt(req.params.offset);
   const page: number = parseInt(req.params.page);

   const query = { companyId: companyID }

   return item_model
      .find(query).skip(page * page)
      .limit(offset)
      .then((items) => res.status(200).json({ items }))
      .catch(error => res.status(500).json({ error }))


}
const deleteitem = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return item_model.findByIdAndDelete(id)
      .then(() => res.status(201).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
}

const getitemById = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return item_model
      .findById(id)
      .then((item) => {
         if (item) {
            return res.status(200).json({
               item
            })
         } else {
            return res.status(404).json({ "message": "item not found" })
         }
      })
      .catch(error => res.status(500).json({ error }))
}

export default { createitem, updateitem, getitems, getitemById, deleteitem }