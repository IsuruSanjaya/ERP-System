import { Form, Modal, Row, Button, DatePicker, Input, Select, Col, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { PhurchaseRequestModel } from '../../models/purchase_request'
import PurchaseOrderService from '../../services/purchase_request_service'
import numberValidator from '../common/number_validator'
import stringValidator from '../common/validation_helper'
import { PlusCircleOutlined } from '@ant-design/icons';
import { PurchaseRequestOrderModel } from '../../models/purchase_request_order_model'

import { ColumnsType } from 'rc-table/lib/interface'


interface DummItemModel {
   "_id": string,
   "price": number,
   "item_name": string,
   "companyName": string,
}

interface Props {
   isOpen: boolean,
   handleOk: () => void,
   handleCancel: () => void,
   request?: PhurchaseRequestModel
}


const dummyItems = [
   {
      "_id": "asdad",
      "price": 14810,
      "item_name": "Television",
      "companyName": "Kaluthara Branch",
   },
   {
      "_id": "asdad",
      "price": 14810,
      "item_name": "Television",
      "companyName": "Kaluthara Branch",
   },
   {
      "_id": "asdad",
      "price": 14810,
      "item_name": "Television",
      "companyName": "Kaluthara Branch",
   },
   {
      "_id": "asdad",
      "price": 14810,
      "item_name": "Television",
      "companyName": "Kaluthara Branch",
   },
   {
      "_id": "asdad",
      "price": 14810,
      "item_name": "Television",
      "companyName": "Kaluthara Branch",
   },
];


const dummySuppliyers = [
   {
      "suppliter": "Kaluthara Branch",
      "_id": "1",
   },
   {
      "suppliter": "Kaluthara Branch",
      "_id": "1",
   },
   {
      "suppliter": "Kaluthara Branch",
      "_id": "1",
   },
   {
      "suppliter": "Kaluthara Branch",
      "_id": "1",
   },
]

const AddPurchaseRequest = ({ isOpen, handleCancel, handleOk, request }: Props) => {

   const [status, setStatus] = useState<boolean>(false);
   const [requestTo, setRequestTo] = useState<string>("")
   const [requestToName, setRequestToName] = useState<string>("")

   const [totalBill, setTotalBill] = useState<number>(0);
   const [selectedItem, setSelectedItem] = useState<PhurchaseRequestModel>();
   const [isAddModal, setIsAddModal] = useState<boolean>(false);




   const openCloseAddItemModal = () => {
      setIsAddModal(!isAddModal)
   }

   const createOrder = async () => {
      if (request) {
         console.log("===> " + request._id)
         const o: PhurchaseRequestModel = {
            requestBy: "1",
            totalBill: totalBill,
            status: status,
            requestTo: requestToName,
            requestToId: requestTo,

         }
         await PurchaseOrderService.updatePurchaseRequest(request._id!, o)
            .then((val) => {
               handleOk();
            })
            .catch(err => console.log(`creae sales request failed ${err}`))
      } else {
         if (selectedItem) {

            const request: PhurchaseRequestModel = {
               requestBy: "1",
               status: status,
               totalBill: totalBill,
               requestTo: requestToName,
               requestToId: requestTo,
            }
            await PurchaseOrderService.createPurchaseRequest(request)
               .then((val) => {
                  handleOk();
               })
               .catch(err => console.log(`creae sales request failed ${err}`))
         }

      }

   }


   useEffect(() => {
      if (request) {
         setTotalBill(request.totalBill)
         setStatus(request.status)
      }
   }, [request])




   return (
      <Modal
         open={isOpen}
         onCancel={handleCancel}
         onOk={createOrder}
         width={1000}
         title={request ? "Edit Purchase request" : "Add Purchase request"}
         footer={null}
      >

         <Form
            layout='vertical'
         >
            <Form.Item>
               <Select
                  defaultValue={requestToName}
                  onChange={(val) => {
                     if (val) {
                        setRequestToName(val)
                     }
                  }}
               >
                  {
                     dummySuppliyers.map(supplier => {
                        return <Select.Option key={supplier._id} value={supplier.suppliter}>
                           {supplier.suppliter}
                        </Select.Option>
                     })
                  }
               </Select>
            </Form.Item>
         </Form>

         <Button onClick={() => { openCloseAddItemModal() }} shape="circle" icon={<PlusCircleOutlined />} />

         {/* <Table columns={columns} dataSource={selectedItems} /> */}
         <Modal
            open={isAddModal}
            title="Add Item"
            footer={null}
         >
            <Row>
               <Col span={6}>
                  <Select
                     style={{ width: "100%" }}
                     onChange={(val) => {
                        if (val) {
                           dummyItems.forEach(item => {
                              if (item.item_name === val) {
                       
                              }
                           })
                        }
                     }}
                  >
                     {
                        dummyItems.map(item => {
                           return <Select.Option value={item.item_name}>{item.item_name}</Select.Option>
                        })
                     }
                  </Select>
               </Col>
               <Col span={6}>

               </Col>
               <Col span={6}></Col>
            </Row>
         </Modal>
      </Modal>
   )
}

export default AddPurchaseRequest