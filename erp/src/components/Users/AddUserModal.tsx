import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import React, { useState, useEffect } from 'react'
import { EmployeeModel } from '../../models/employee_model'
import EmployeeService from '../../services/employee_service';
import numberValidator from '../common/number_validator';
import stringValidator from '../common/validation_helper';


interface Props {
   isOpen: boolean,
   handleOk: () => void,
   handleCancel: () => void,
   employee?: EmployeeModel
}


const roles: string[] = [
   "Supervisor",
   "Delivery boy",
   "Driver",
   "Marketing executive",
   "Cleaner",
]

const AddUserModal = ({ isOpen, handleCancel, handleOk, employee }: Props) => {
   const [name, setName] = useState<string>("");
   const [nic, setNic] = useState<string>("");
   const [role, setRole] = useState<string>("");
   const [address, setAddress] = useState<string>("");
   const [contactNumber, setContactNumber] = useState<string>("");
   const [age, setAge] = useState<number>(0);
   const [salary, setSalary] = useState<number>(0);


   const createEmployee = async () => {
      if (name !== "" && nic !== "" && address !== "" && role !== "" && age !== 0 && salary !== 0 && contactNumber !== "") {
         const e: EmployeeModel = {
            name: name,
            nic: nic,
            address: address,
            contactNumber: contactNumber,
            role: role,
            age: age,
            salary: salary,
         }
         if (employee) {
            await EmployeeService.updateEmployee(employee._id!, e)
               .catch(err => console.log(`update employee failed ${err}`))
         } else {
            await EmployeeService.createEmployee(e)
               .catch(err => console.log(`create employee failed ${err}`))
         }
         handleOk();
      }
   }



   useEffect(() => {
      if (employee) {
         setAddress(employee.address)
         setName(employee.name)
         setContactNumber(employee.contactNumber);
         setAge(employee.age)
         setRole(employee.role)
         setSalary(employee.salary)
         setNic(employee.nic)
      }
      console.log(employee)
   }, [employee])



   return (
      <Modal
         open={isOpen}
         onCancel={handleCancel}
         onOk={handleOk}
         width={1000}
         title={employee ? "Edit User" : "Add user"}
         footer={null}
      >
         <Form
            layout='vertical'
            autoComplete="false"
            initialValues={{
               emplyeeName: employee?.name
            }}
            onFinish={() => {
               setName("");
               setNic("")
               setAddress("")
               setContactNumber("")
            }}
         >

            <Row>
               <Col span={24}>
                  <Form.Item
                     name={"emplyeeName"}
                     label="Employees Name"
                     rules={stringValidator("Enter employee name")}
                     initialValue={
                        name
                     }
                  >
                     <Input placeholder='Enter here'
                        onChange={(val) => {
                           if (val) {
                              setName(val.target.value);
                           }
                        }}
                     />
                  </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={24}>
                  <Form.Item
                     name={"employee-nic"}
                     label="Employee NIC"
                     rules={stringValidator("Enter employee nic")}
                     initialValue={
                        employee?.nic
                     }
                  >
                     <Input
                        maxLength={12}
                        value={nic}
                        placeholder='Enter here'
                        onChange={(val) => {
                           if (val) {
                              setNic(val.target.value);
                           }
                        }}
                     />
                  </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={24}>
                  <Form.Item
                     name={"employee-address"}
                     label="Employee Address"
                     rules={stringValidator("Enter employee address")}
                     initialValue={
                        employee?.address
                     }
                  >
                     <Input.TextArea
                        value={address}
                        placeholder='Enter here'
                        onChange={(val) => {
                           if (val) {
                              setAddress(val.target.value);
                           }
                        }}
                     />
                  </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={8}>
                  <Form.Item
                     name={"Role"}
                     label="Role"

                     rules={stringValidator("Enter valid role")}
                     initialValue={
                        employee?.role
                     }
                  >
                     <Select
                        defaultValue={employee?.role}
                        placeholder="select item"
                        onChange={(val) => {
                           if (val) {
                              setRole(val);

                           }
                        }}
                     >
                        {
                           roles.map((item) => <Select.Option
                              key={item}
                              value={item}
                           >{item}</Select.Option>)
                        }
                     </Select>
                  </Form.Item>
               </Col>
               <Col span={2} style={{ margin: "0 8px" }} >
                  <Form.Item
                     name={"employee-age"}
                     label="Age"
                     rules={numberValidator("Please enter valid age")}
                     initialValue={
                        employee?.age
                     }

                  >
                     <Input
                        value={age}
                        maxLength={3}
                        onChange={(val) => {
                           if (val.target.value) {
                              console.log(val.target.value)
                              setAge(parseInt(val.target.value));

                           }
                        }}
                     />
                  </Form.Item>
               </Col>
               <Col span={4} style={{ margin: "0 8px" }} >
                  <Form.Item
                     name={"employee-SALARY"}
                     label="Salary"
                     rules={numberValidator("Please enter valid salary")}
                     initialValue={
                        employee?.salary
                     }
                  >
                     <Input

                        value={salary}
                        onChange={(val) => {
                           if (val.target.value) {
                              console.log(val.target.value)
                              setSalary(parseInt(val.target.value));
                           }
                        }}
                     />
                  </Form.Item>
               </Col>
               <Col span={8}>
                  <Form.Item
                     name={"employee-contactNumber"}
                     label="Contact Number"
                     rules={stringValidator("Please enter valid contact Number")}
                     initialValue={
                        employee?.contactNumber
                     }
                  >
                     <Input
                        value={contactNumber}
                        maxLength={11}
                        onChange={(val) => {
                           if (val.target.value) {
                              console.log(val.target.value)
                              setContactNumber(val.target.value);

                           }
                        }}
                     />
                  </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={12}>

               </Col>
               <Col span={7} />
               <Col span={5}>
                  <Button type='primary' htmlType='submit' onClick={createEmployee} style={{ width: "100%" }}>{employee ? "Edit Employee" : "Create User"}</Button>
               </Col>
            </Row>
         </Form>

      </Modal>
   )
}

export default AddUserModal