import { NextFunction, Request, Response } from 'express';
import company_model from '../models/company_model';


const createRegisteredcompany = (req: Request, res: Response, next: NextFunction) => {
   const { name, location } = req.body;
   const company = new company_model({
      name, location
   })

   return company.save().then((company) => res.status(201).json({ company }))
      .catch(err => res.status(500).json({ "error": err }))
}


const getRegisteredcompany = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return company_model.findById(id)
      .then(company => {
         if (company) {
            return res.status(200).json({ company })
         } else {
            return res.status(404).json({ "message": "company not found" })
         }
      }).catch(error => res.status(500).json({ error }))
}

const updateRegisteredcompany = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return company_model.findById(id).then((company) => {
      if (company) {
         return company.set(req.body)
            .save().then((company) => res.status(201)
               .json({ company }))
            .catch(error => res.status(500).json({ error }))
      } else {
         return res.status(404).json({ "message": "company not found" })
      }
   }).catch(error => res.status(500).json({ error }))
}

const deleteRegisteredcompany = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return company_model.findByIdAndDelete(id)
      .then(() => res.status(201).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
}




export default { createRegisteredcompany, getRegisteredcompany, updateRegisteredcompany, deleteRegisteredcompany }
