import { Button, Col, Form, Input, Row } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import Modal from 'antd/lib/modal/Modal'
import React, { useState, useEffect } from 'react'
import { CustomeModel } from '../../models/customer_model'
import CustomerService from '../../services/customer_service'
import stringValidator from '../common/validation_helper'

interface Props {
   isOpen: boolean,
   handleOk: () => void,
   handleCancel: () => void,
   customer?: CustomeModel
}



const AddCustomerModal = ({ isOpen, handleCancel, handleOk, customer }: Props) => {
   const [name, setName] = useState("")
   const [nic, setNic] = useState("")
   const [mobile, setMobile] = useState("")
   const [email, setEmail] = useState("")
   const [address, setAddress] = useState("")

   const createCustomer = async () => {
      if (name !== "" && nic !== "" && mobile !== "" && email !== "" && address !== "") {
         const c: CustomeModel = {
            name: name,
            date: new Date(),
            nic,
            mobile,
            email,
            address,
            companyId: "1"
         }

         if (customer) {
            console.log(c);
            await CustomerService.updateCustomer(customer?._id!, c).catch(errr => console.log(`update customer failed ${errr}`))
         } else {
            await CustomerService.createCustomer(c).catch(errr => console.log(`create customer failed ${errr}`))
         }

         handleOk();
      }
   }

   useEffect(() => {
      if (customer) {
         setName(customer.name);
         setAddress(customer.address);
         setNic(customer.nic);
         setMobile(customer.mobile);

      }
   }, [customer])

   const initialData = {
      name: customer?.name ? customer?.name : "",
      nic: customer?.nic ? customer?.nic : "",
      mobile: customer?.mobile ? customer?.mobile : "",
      email: customer?.email ? customer?.email : "",
      address: customer?.address ? customer?.address : "",
   }



   return (
      <Modal
         open={isOpen}
         onCancel={handleCancel}
         onOk={handleOk}
         width={1000}
         title={customer ? "Edit Customer" : "Add Customer"}
         footer={null}

      >
         <Form
            layout='vertical'
            autoComplete="false"
            initialValues={initialData}
         >
            <Row>
               <Col span={24}>
                  <FormItem
                     label="Name"
                     name="name"
                     initialValue={initialData.name}
                     rules={stringValidator("Please enter a valid name")}>

                     <Input
                        value={name}
                        // placeholder={`${name}`}
                        onChange={(val) => {
                           if (val) {
                              setName(val.target.value);
                           }
                        }} />
                  </FormItem>
               </Col>
            </Row>
            <Row>
               <Col span={6}>
                  <FormItem
                     label="Nic"
                     name="nic"
                     initialValue={initialData.nic}
                     rules={stringValidator("Please enter a valid nic")}>
                     <Input
                        maxLength={11}
                        value={nic}
                        onChange={(val) => {
                           if (val) {
                              setNic(val.target.value);
                           }
                        }} />
                  </FormItem>
               </Col>
               <Col span={2} />
               <Col span={6}>
                  <FormItem
                     label="Mobile"
                     name="mobile"
                     rules={stringValidator("Please enter a valid mobile number")}>
                     <Input
                        maxLength={10}
                        onChange={(val) => {
                           if (val) {
                              setMobile(val.target.value);
                           }
                        }} />
                  </FormItem>
               </Col>
               <Col span={2} />
               <Col span={6}>
                  <FormItem
                     label="Email"
                     name="email"
                     initialValue={initialData.email}
                     rules={stringValidator("Please enter a valid email")}>
                     <Input
                        value={email}
                        onChange={(val) => {
                           if (val) {
                              setEmail(val.target.value);
                           }
                        }} />
                  </FormItem>
               </Col>
            </Row>
            <Row>
               <Col span={24}>
                  <Form.Item
                     label="Address"
                     name="address"
                     rules={stringValidator("Please enter a valid address")}
                  >
                     <Input.TextArea
                        onChange={(val) => {
                           if (val) {
                              setAddress(val.target.value);
                           }
                        }}
                     >
                     </Input.TextArea>
                  </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={12}>
               </Col>
               <Col span={7} />
               <Col span={5}>
                  <Button type='primary' htmlType='submit' onClick={() => { createCustomer() }} style={{ width: "100%" }}>{customer ? "Edit Customer" : "Add Customer"}</Button>
               </Col>
            </Row>
         </Form>
      </Modal>
   )
}

export default AddCustomerModal