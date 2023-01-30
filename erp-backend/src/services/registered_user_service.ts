import { NextFunction, Request, Response } from 'express';
import registered_user from '../models/registered_user';


const createRegisteredUser = (req: Request, res: Response, next: NextFunction) => {
   const { email, name, photoUrl, companyId } = req.body;
   const regUser = new registered_user({
      email, name, photoUrl, companyId
   })

   return regUser.save().then((user) => res.status(201).json({ user }))
      .catch(err => res.status(500).json({ "error": err }))
}


const getRegisteredUser = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return registered_user.findById(id)
      .then(user => {
         if (user) {
            return res.status(200).json({ user })
         } else {
            return res.status(404).json({ "message": "user not found" })
         }
      }).catch(error => res.status(500).json({ error }))
}

const updateRegisteredUser = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return registered_user.findById(id).then((user) => {
      if (user) {
         return user.set(req.body)
            .save().then((user) => res.status(201)
               .json({ user }))
            .catch(error => res.status(500).json({ error }))
      } else {
         return res.status(404).json({ "message": "user not found" })
      }
   }).catch(error => res.status(500).json({ error }))
}

const deleteRegisteredUser = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return registered_user.findByIdAndDelete(id)
      .then(() => res.status(201).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
}




export default { createRegisteredUser, getRegisteredUser, updateRegisteredUser, deleteRegisteredUser }
