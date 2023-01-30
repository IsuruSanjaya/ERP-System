import { Badge, Button, Input, Space, Table } from 'antd'
import React, { useState, useEffect } from 'react'
import AddButton from '../common/AddButton'
import CustomRow from '../common/Row'
import WrapperCard from '../common/WrapperCard'
import WrapperContainer from '../common/WrapperContainer'
import { ItemModel } from '../../models/item_model'
import { ColumnsType } from 'antd/lib/table'
import { EditOutlined, DeleteOutlined,DownloadOutlined,SelectOutlined } from '@ant-design/icons'
import AddItemModal from './AddItemModal'
import ItemService from '../../services/item_service'
import DeleteModal from '../common/DeleteModal'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable'

const PuchaseItems = () => {

  const [isAddItemModalOpen, setIsAddItemModal] = useState<boolean>(false);
  const [items, setItems] = useState<ItemModel[]>([])
  const [selectedItem, setSelectedItem] = useState<ItemModel>()
  const [isDeleteModalOpen, setIsDelete] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const addItem = async () => {
    setIsAddItemModal(false)
    await refresher();
  }

  const cancelItem = () => {
    setIsAddItemModal(false)
  }

  const refresher = async () => {
    await ItemService.getDeliveryItems(0, 10)
      .then(res => {
        setItems([...res]);
      })
      .catch(err => console.log(`get items from db failed ${err}`))
  }

  const deleteItem = async () => {
    if (selectedItem) {
      console.log("called")
      await ItemService.deleteDeliveryItem(selectedItem._id!)
      await refresher();
      setIsDelete(false);
    }
  }
  const generatePdf = () => {
    const doc = new jsPDF()
    autoTable(doc, {
      columns: [
        { header: 'Name', dataKey: 'name' },
        { header: ' Price', dataKey: 'price' },
        { header: 'Stock', dataKey: 'inStock' },
        { header: 'Manufacturer', dataKey: 'manufacturer' },
        { header: 'Supplier', dataKey: 'supplier' },

      ],
      body: items.map(item => {
        return {
          name: item.name,
          price: item.price,
          inStock: item.inStock ? "InStock": "Out of Stock",
          manufacturer: item.manufacturer,
          supplier: item.supplier,


        };
      })
    })
    doc.save('ItemsDetails.pdf')
  }

  const columns: ColumnsType<ItemModel> = [
    // {
    //   title: "Item ID",
    //   dataIndex: "_id",
    //   key: "id",
    // },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
        return <>
          <Input
            value={selectedKeys[0]}
            onChange={(val) => {
              setSelectedKeys(val.target.value ? [val.target.value] : [])
              confirm({closeDropdown : false})
            }}
            onPressEnter={() => {
              confirm()
            }}
            onBlur={() => {
              confirm()
            }}
          ></Input>
          <Button type="primary"
            onClick={() => { confirm(); }}>Search
          </Button>
          
          
        </>
      },
      filterIcon: () => {
        return <SelectOutlined style={{ color: "red" }} />
      },
      onFilter: (value, record) => {
        return record.name.toLowerCase().includes(value.toString().toLowerCase())
      }
      

    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price"

    },
    {
      title: "Manufacturer",
      dataIndex: "manufacturer",
      key: "manufacturer",
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      key: "manufacturer",
    },
    {
      title: "Item Status",
      key: "status",
      render: (_, record: ItemModel) => {
        return <Badge count={record.inStock ? "In Stock" : "Out of stock"} />
      }
    },
    {
      title: "",
      key: "actions",
      render: (_, record: ItemModel) => {
        return <Space size="middle">
          <Button icon={<EditOutlined key={record._id} />} onClick={() => {
            setSelectedItem(record);
            setIsEditModalOpen(true);

          }}></Button>
          <Button icon={<DeleteOutlined />} onClick={() => {
            const i: ItemModel = {
              _id: record._id,
              name: record.name,
              price: record.price,
              inStock: record.inStock,
              manufacturer: record.manufacturer,
              supplier: record.supplier,
              companyId: record.companyId,
            }
            setSelectedItem(i);
            setIsDelete(true);
          }}></Button>
        </Space>
      }
    },
  ]
  

  useEffect(() => {
    ItemService.getDeliveryItems(0, 10)
      .then(res => {
        setItems([...res]);
      })
      .catch(err => console.log(`get items from db failed ${err}`))
  }, [])


  return (
    <WrapperContainer>
      <WrapperCard>
        <CustomRow style={{ justifyContent: "space-between", padding: "16px" }} >
          <h1>Items</h1>
          <div>
          <Button style={{margin:"0 16px"}} onClick={generatePdf} shape="circle" icon={<DownloadOutlined/>} type="primary"/>
          <AddButton onClick={() => { setIsAddItemModal(true) }} />
          </div>
        </CustomRow>
        <Table dataSource={items} columns={columns} style={{ width: "100%", height: "100%" }} />
      </WrapperCard>
      <AddItemModal isOpen={isAddItemModalOpen} handleCancel={cancelItem} handleOk={addItem} />
      <AddItemModal isOpen={isEditModalOpen} handleCancel={() => { setIsEditModalOpen(false) }} handleOk={async () => { await refresher(); setIsEditModalOpen(false) }} item={selectedItem} />
      <DeleteModal isModalOpen={isDeleteModalOpen} handleCancel={() => { setIsDelete(false) }} handleOk={async () => { deleteItem(); }} text="Do you want to delete purchase order ? " />
    </WrapperContainer>
  )
}

export default PuchaseItems