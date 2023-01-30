import { Button, Col, Form, Input, Modal, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { ItemModel } from '../../models/item_model'
import ItemService from '../../services/item_service'
import numberValidator from '../common/number_validator'
import stringValidator from '../common/validation_helper'
import LogRocket from 'logrocket';
LogRocket.init('yjover/erp');

interface Props {
   isOpen: boolean,
   handleOk: () => void,
   handleCancel: () => void,
   item?: ItemModel
}


const AddItemModal = ({ isOpen, handleCancel, handleOk, item }: Props) => {
   const [itemName, setItemName] = useState<string>("");
   const [itemPrice, setItemPrice] = useState<number>(0);
   const [itemManufacturer, setItemManufacturer] = useState<string>("");
   const [supplier, setSupplier] = useState<string>("");
   const [refesh,seRefesh] = useState<any>(false);
   const createItem = async () => {

      if (itemName !== "" && itemPrice !== 0 && itemManufacturer !== "" && supplier !== "") {
         const i: ItemModel = {
            name: itemName,
            price: itemPrice,
            manufacturer: itemManufacturer,
            inStock: true,
            supplier: supplier,
            companyId: "1",
         }
         if (item) {
            await ItemService.updateDeliverItem(item._id!, i)
            seRefesh(true)
         } else {
            await ItemService.createDeliveryItem(i)
               .catch(err => console.log(`create item failed ${err}`))
         }
         handleOk();
      } else {
         console.log("else caleed " + itemName);
      }
   }
   useEffect(() => {
      if (item) {
         setItemManufacturer(item.manufacturer)
         setItemName(item.name)
         setItemPrice(item.price)
         setSupplier(item.supplier)
        
      }
   }, [item,refesh])
   useEffect(() => {
     
   }, [refesh])
   return (
      <Modal
         open={isOpen}
         onCancel={handleCancel}
         onOk={handleOk}
         width={1000}
         title={item ? "Edit Item" : "Add item"}
         footer={null}
      >
         <Form
            layout='vertical'
            autoComplete="false"
         >
            <Row>
               <Col span={11}>
                  <Form.Item
                     initialValue={item?.name}
                     label="Item name"
                     name={"item-name"}
                     rules={stringValidator("Please enter item name")}>
                     <Input
                        value={itemName}
                        onChange={(val) => {
                           if (val) {
                              setItemName(val.target.value);
                           }
                        }} />
                  </Form.Item>
               </Col>
               <Col span={2} />
               <Col span={11}>
                  <Form.Item
                     initialValue={item?.price}
                     label="Item price"
                     name={"item-price"}
                     rules={numberValidator("Please enter item price")}>
                     <Input
                        value={itemPrice}
                        onChange={(val) => {
                           if (val) {
                              setItemPrice(parseInt(val.target.value));
                           }
                        }} />
                  </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={11}>
                  <Form.Item
                     label="Item manufacturer"
                     name={"item-manufacturer"}
                     initialValue={item?.manufacturer}
                     rules={stringValidator("Please enter item manufacturer")}>
                     <Input
                        value={itemManufacturer}
                        onChange={(val) => {
                           if (val) {
                              setItemManufacturer(val.target.value);
                           }
                        }} />
                  </Form.Item>
               </Col>
               <Col span={2} />
               <Col span={11}>
                  <Form.Item
                     label="Item Supplier"
                     name={"item-supplier"}
                     rules={stringValidator("Please enter item supplier")}
                     initialValue={item?.supplier}
                  >
                     <Input
                        value={supplier}
                        onChange={(val) => {
                           if (val) {
                              setSupplier(val.target.value);
                           }
                        }} />
                  </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={19} />
               <Col span={5}>
                  <Button type='primary' htmlType='submit' style={{ width: "100%" }} onClick={createItem}>{item ? "Edit Item" : "Add Item"}</Button>
               </Col>
            </Row>
         </Form>
      </Modal >
   )
}

export default AddItemModal