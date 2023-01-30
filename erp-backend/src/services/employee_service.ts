import { NextFunction, Request, Response } from 'express';
import { findAncestor } from 'typescript';
import employee_model from '../models/employee_model';


const createemployee = (req: Request, res: Response, next: NextFunction) => {
   const {
      name,
      nic,
      age,
      salary,
      role,
      address,
      contactNumber,
   } = req.body;

   const employee = new employee_model(
      {
         name,
         nic,
         age,
         salary,
         role,
         address,
         contactNumber,
      })

   return employee.save().then((employee) => res.status(201).json(employee)).catch(error => res.status(500).json({ error }))

}
const updateemployee = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return employee_model.findById(id).then((employee) => {
      if (employee) {
         return employee.set(req.body)
            .save().then((employee) => res.status(201)
               .json({ employee }))
            .catch(error => res.status(500).json({ error }))
      } else {
         return res.status(404).json({ "message": "employee not found" })
      }
   }).catch(error => res.status(500).json({ error }))

}
const getemployees = (req: Request, res: Response, next: NextFunction) => {
   const companyID: string = req.params.id;
   const offset: number = parseInt(req.params.offset);
   const page: number = parseInt(req.params.page);
   return employee_model.find({}).skip(page * page)
      .limit(offset)
      .then((employees) => res.status(200).json({ employees }))
      .catch(error => res.status(500).json({ error }))


}
const deleteemployee = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return employee_model.findByIdAndDelete(id)
      .then(() => res.status(201).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
}

const getemployeeById = (req: Request, res: Response, next: NextFunction) => {
   const id = req.params.id;
   return employee_model
      .findById(id)
      .then((employee) => {
         if (employee) {
            return res.status(200).json({
               employee
            })
         } else {
            return res.status(404).json({ "message": "employee not found" })
         }
      })
      .catch(error => res.status(500).json({ error }))
}

export default { createemployee, updateemployee, getemployees, getemployeeById, deleteemployee }