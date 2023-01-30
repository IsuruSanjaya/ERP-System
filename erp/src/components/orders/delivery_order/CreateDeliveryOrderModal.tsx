import { MouseEvent, useEffect, useState } from 'react'
import { DatePicker, Form, Modal, Col, Row, Input, Button, Table, Select, } from 'antd';
import { DeliveryOrderModel } from "../../../models/delivery_order_model"
import stringValidator from "../../common/validation_helper"
import DeliveryOrderService from '../../../services/delivery_order_service';
import { PlusCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table'
import { DeleteOutlined } from '@ant-design/icons';

import ItemService from '../../../services/item_service';
import { ItemModel } from '../../../models/item_model';
interface Props {
   shouldOpen: boolean,
   confirmLoading: boolean,
   handleOk: () => void,
   handleCancel: ((e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void),
   deliveryOrder?: DeliveryOrderModel
}






const CreateDeliveryOrderModal = ({ shouldOpen, handleOk, handleCancel, confirmLoading, deliveryOrder }: Props) => {
   const [transactionDate, setTransactionDate] = useState("2022-10-12");
   const [deliveryDate, setDeliveryDate] = useState("2022-10-15");
   const [customersName, setCustomersName] = useState<string>("");
   const [address, setAddress] = useState<string>("");
   const [isOpen, setIsOpen] = useState(false)
   const [selectedItems, setSelectedItems] = useState<ItemModel[]>([])
   const [selectedIem, setSelectedItem] = useState<ItemModel>()
   const [selectedIemQuantity, setSelectedItemQuantity] = useState<number>(0)
   const [selectedItemUnitPrice, setSelectedItemUnitPrice] = useState("")
   const [totalBill, setTotalBill] = useState<number>(0)
   const [items, setItems] = useState<ItemModel[]>([])

   const columns: ColumnsType<ItemModel> = [
      // {
      //    title: "Item ID",
      //    dataIndex: "id",
      //    key: "id",
      // },
      {
         title: "Item Name",
         dataIndex: "name",
         key: "name",
      },
      {
         title: "Quantity",
         dataIndex: "quantity",
         key: "quantity",
      },
      {
         title: "Unit Price",
         dataIndex: "price",
         key: "unitPrice",
      },
      // {
      //    title: "",
      //    key: "actions",

      //    render: (_, record: ItemModel) => {
      //       return <Button onClick={() => { removeItem(record) }} icon={<DeleteOutlined />} />
      //    }
      // }

   ]


   const createDeliveryOrder = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {


      const d: DeliveryOrderModel = ({
         date: new Date(deliveryDate),
         transactionDate: new Date(transactionDate),
         transactionType: "asd",
         coustomer: customersName,
         shippingAddress: address,
         companyId: "1",
         totalBill: totalBill,
         status: 0,
      });

      if (deliveryOrder) {
         DeliveryOrderService.updateDeliverItem(deliveryOrder._id!, d).then((val) => {
            handleOk();
         }).catch(err => console.log(`update delivery order failed ${err}`));
      } else {
         DeliveryOrderService.createDeliveryItem(d).then((val) => {
            handleOk();
         }).catch(err => console.log(`create delivery order failed ${err}`));
      }



      // 
   }


   const addItem = () => {
      let f: ItemModel[] = selectedItems;
      if (selectedIem) {
         const i: ItemModel = {
            _id: selectedIem._id!,
            name: selectedIem.name,
            price: selectedIem.price,
            inStock: selectedIem.inStock,
            manufacturer: selectedIem.manufacturer,
            companyId: selectedIem.companyId,
            quantity: selectedIemQuantity,
            supplier: selectedIem.supplier,
         }
         f.push(i)
         setSelectedItems([...f])
         const tot = selectedIem?.price * selectedIemQuantity;
         setTotalBill(totalBill + tot)
      }
      setIsOpen(false);
   }

   const removeItem = (i: ItemModel) => {
      let is: ItemModel[] = selectedItems;
      let count: number = 0;
      selectedItems.forEach(item => {
         if (item === i) {
            is.slice(count, 1)
         }
         count++
      })
      setSelectedItems([...is])
   }

   const openCloseAddItemModal = () => {
      setIsOpen(!isOpen)
   }


   useEffect(() => {
      if (deliveryOrder) {
         console.log("called");
         setTransactionDate(deliveryOrder.transactionDate.toLocaleDateString());
         setDeliveryDate(deliveryOrder.date.toLocaleDateString());
         setTotalBill(deliveryOrder.totalBill);
         setCustomersName(deliveryOrder.coustomer);
         setAddress(deliveryOrder.shippingAddress);
      }

      ItemService.getDeliveryItems(1, 10).then(res => setItems([...res]))
   }, [selectedItems, deliveryOrder, setSelectedItems])


   const data = {
      transactionDate: deliveryOrder?.transactionDate ? deliveryOrder?.transactionDate : "",
      deliveryDate: deliveryOrder?.date ? deliveryOrder.date : "",
      coustomer: deliveryOrder?.coustomer ? deliveryOrder.coustomer : "",
      shippingAddress: deliveryOrder?.date ? deliveryOrder.shippingAddress : "",
      totalBill: deliveryOrder?.totalBill ? deliveryOrder.totalBill : 0
   }

   return (
      <Modal
         title={deliveryOrder ? "Update Delivery Order" : "Create Delivery Order"}
         open={shouldOpen}
         onCancel={handleCancel}
         width={1000}
         footer={null}
      >
         <Form
            layout="vertical"
            initialValues={data}
         >
            {
               !deliveryOrder &&
               <Row>
                  <Col span={12}>
                     <Form.Item
                        name="transaction-date"
                        label="Transaction Date"

                     >
                        <DatePicker
                           onChange={(val) => {
                              if (val) {
                                 var month: number = val.month() + 1;
                                 var day: number = val.date();
                                 var year: number = val.year();

                                 setTransactionDate(`${year}-${month}-${day}`)
                              }
                           }} />
                     </Form.Item>
                  </Col>
                  <Col span={12} style={{ display: "flex", flexDirection: "column" }}>
                     <Form.Item
                        name="delivery-date"
                        label="Delivery Date"

                     >
                        <DatePicker
                           onChange={(val) => {
                              if (val) {
                                 var month: number = val.month() + 1;
                                 var day: number = val.date();
                                 var year: number = val.year();

                                 setDeliveryDate(`${year}-${month}-${day}`)

                              }
                           }}
                        />
                     </Form.Item>
                  </Col>

               </Row>}
            <Row>
               <Col span={24}>
                  <Form.Item
                     name="name"
                     label="Customers Name"
                     rules={stringValidator("Customer Name is required")}
                     initialValue={data.coustomer}
                  >
                     <Input value={customersName} onChange={(val) => { setCustomersName(val.target.value) }} />
                  </Form.Item>
               </Col>

            </Row>
            <Row>
               <Col span={24}>
                  <Form.Item
                     name="address"
                     label="Address"
                     rules={stringValidator("Customer Address is required")}
                     initialValue={data.shippingAddress}
                  >
                     <Input.TextArea value={address} rows={3} onChange={(val) => { setAddress(val.target.value) }} />
                  </Form.Item>
               </Col>

            </Row>
            {!deliveryOrder && <Button onClick={() => { openCloseAddItemModal() }} shape="circle" icon={<PlusCircleOutlined />} />}

            {!deliveryOrder && <Table columns={columns} className="table" dataSource={selectedItems} />}
            {!deliveryOrder && <h1> Total Bill : {totalBill}</h1>}
            <Row>
               <Col span={19} />
               <Col span={4}>
                  <Button type='primary' htmlType='submit' onClick={createDeliveryOrder} style={{ width: "100%" }}>{deliveryOrder ? "Edit Order" : "Create Order"}</Button>
               </Col>
            </Row>
         </Form>


         <Modal title="Add Item" open={isOpen} onOk={() => addItem()} onCancel={() => { openCloseAddItemModal() }}>
            <Form>
               <Row>
                  <Col span={7}>
                     <Select
                        style={{ width: "100%" }}
                        onChange={(val) => {
                           if (val) {
                              items.forEach(item => {
                                 if (item.name === val) {
                                    setSelectedItemUnitPrice(item.price.toString())

                                    setSelectedItem(item)
                                 }
                              })
                           }
                        }}
                     >
                        {
                           items.map(item => {
                              return <Select.Option value={item.name} key={item._id}>{item.name}</Select.Option>
                           })
                        }
                     </Select>
                  </Col>
                  <Col span={2} />
                  <Col span={7}>
                     <Input placeholder="Quantity" onChange={(val) => { setSelectedItemQuantity(parseInt(val.target.value)) }} />
                  </Col>
                  <Col span={8} style={{ padding: "0px 8px" }}>
                     <Input
                        value={selectedItemUnitPrice}
                        placeholder="Unit Price"
                        onChange={(val) => { setSelectedItemUnitPrice(val.target.value) }}
                     />
                  </Col>

               </Row>

            </Form>
         </Modal>
      </Modal>
   )
}

export default CreateDeliveryOrderModal