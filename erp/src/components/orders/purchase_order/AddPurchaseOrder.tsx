import { MouseEvent, useEffect, useState } from 'react'
import { Form, Modal, Col, Row, Input, Button, Table, Dropdown, Menu, Space, } from 'antd';
import stringValidator from "../../common/validation_helper"

import { PlusCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table'
import { ItemModel } from '../../purchase_request/item_model';
import { DownOutlined } from '@ant-design/icons';
import { PhurchaseOrderModel } from '../../../models/purchase_order';
import PurchaseOrderService from '../../../services/purchase_service';

interface Props {
   shouldOpen: boolean,
   handleOk: () => void,
   handleCancel: ((e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void),
   order?: PhurchaseOrderModel
}

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
      dataIndex: "unitPrice",
      key: "unitPrice",
   },


]
const AddPurchaseOrder = ({ shouldOpen, handleOk, handleCancel, order }: Props) => {
   const [supplierName, setSuppliersName] = useState<string>("")
   const [store, setStore] = useState<string>("")




   const [isOpen, setIsOpen] = useState(false)
   const [selectedItems, setSelectedItems] = useState<ItemModel[]>([])
   const [selectedIemName, setSelectedItemName] = useState("")
   const [selectedIemQuantity, setSelectedItemQuantity] = useState("")
   const [selectedItemUnitPrice, setSelectedItemUnitPrice] = useState("")
   const [totalBill, setTotalBill] = useState<number>(0)

   const createPurchaseOrder = async () => {
      if (supplierName || store) {
         const o: PhurchaseOrderModel = ({
            purchaseOrderDate: new Date(),
            suppierName: supplierName,
            store: store,
            netAmount: totalBill,
            status: false,
            companyId: "1",
         });
         if (order) {
            await PurchaseOrderService.updatePurchaseOrder(order._id!,o)
         } else {


            await PurchaseOrderService.createDeliveryItem(o).then((val) => {


            }).catch(err => console.log(`create delivery order failed ${err}`));
         }


         handleOk();
      }

   }


   const addItem = () => {
      const item: ItemModel = {
         name: selectedIemName,
         unitPrice: parseFloat(selectedItemUnitPrice),
         quantity: parseFloat(selectedIemQuantity),
      }
      let i: ItemModel[] = selectedItems;
      i.push(item)

      let tot: number = totalBill + (item.quantity * item.unitPrice);
      setTotalBill(tot)
      setSelectedItems([...i])
      openCloseAddItemModal();

   }

   const openCloseAddItemModal = () => {
      setIsOpen(!isOpen)
   }
   const menu = (
      <Menu
         items={[
            {
               key: 'Refreregirator',
               label: "Refreregirator",
               onClick: (val) => {
                  setSelectedItemName(val.key);
               }
            },
            {
               key: 'Television',
               label: "Television",
               onClick: (val) => {
                  setSelectedItemName(val.key);
               }
            },
            {
               key: 'Washing Machine',
               label: "Washing Machine",
               onClick: (val) => {
                  setSelectedItemName(val.key);
               }
            },
         ]}
      />
   );

   useEffect(() => {
      if (order) {

         setSuppliersName(order.suppierName)
         setStore(order.store)
         setTotalBill(order.netAmount)

      }
   }, [selectedItems, order])

   return (
      <Modal
         title={order ? "Edit Order" : "Create Purchase Order"}
         open={shouldOpen}
         onCancel={handleCancel}
         width={1000}
         footer={null}
      >
         <Form
            layout="vertical"
           
            autoComplete="off"
         >
            <Row>
               <Col span={24}>
                  <Form.Item
                     name="name"
                     label="Suppier Name"
                     rules={stringValidator("Customer Name is required")}
                     initialValue={order?.suppierName}
                  >
                     <Input value={order?.suppierName} onChange={(val) => { setSuppliersName(val.target.value) }} />
                  </Form.Item>
               </Col>

            </Row>
            <Row>
               <Col span={11}>
                  <Form.Item
                     name="store"
                     label="Store"
                     rules={stringValidator("Store is required")}
                     initialValue={order?.store}
                  >
                     <Input value={store} onChange={(val) => { setStore(val.target.value) }} />
                  </Form.Item>
               </Col>
               <Col span={2} />
               {/* <Col span={11}>
                  <Form.Item
                     name="total-bill"
                     label="Net Amount"
                     rules={numberValidator("Net Amount is required")}
                     initialValue={order?.netAmount}
                  >
                     <Input value={totalBill} onChange={(val) => { setTotalBill(parseFloat(val.target.value)) }} />
                  </Form.Item>
               </Col> */}

            </Row>
            {!order && <Button onClick={() => { openCloseAddItemModal() }} shape="circle" icon={<PlusCircleOutlined />} />}

            {!order && <Table columns={columns} className="table" dataSource={selectedItems} />}
            {!order && <h1> Total Bill : {totalBill}</h1>}
            <Row>
               <Col span={19} />
               <Col span={4}>
                  <Button type='primary' htmlType='submit' onClick={()=>{createPurchaseOrder();}} style={{ width: "100%" }}>{order ? "Edit Order" : "Create Order"}</Button>
               </Col>
            </Row>
         </Form>


         <Modal title="Add Item" open={isOpen} onOk={() => addItem()} onCancel={() => { openCloseAddItemModal() }}>
            <Form>
               <Row>
                  <Col span={8}><Dropdown overlay={menu} placement="bottom" arrow={{ pointAtCenter: true }}>
                     <Button>
                        <Space>
                           {selectedIemName ?? "Item Name"}
                           <DownOutlined />
                        </Space>
                     </Button>
                  </Dropdown>
                  </Col>
                  <Col span={8}>
                     <Input placeholder="Quantity" onChange={(val) => { setSelectedItemQuantity(val.target.value) }} />
                  </Col>
                  <Col span={8} style={{ padding: "0px 8px" }}>
                     <Input placeholder="Unit Price" onChange={(val) => { setSelectedItemUnitPrice(val.target.value) }} />
                  </Col>

               </Row>

            </Form>
         </Modal>
      </Modal>
   )
}

export default AddPurchaseOrder