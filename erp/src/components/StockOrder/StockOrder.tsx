import Table, { ColumnsType } from 'antd/lib/table'
import React, { useEffect, useState } from 'react'

import StockOrderService from '../../services/stock_order_service'
import CustomRow from '../common/Row'
import { Input, Typography } from 'antd';
import WrapperContainer from '../common/WrapperContainer'
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Tooltip, Space } from 'antd';

import { EditOutlined, DeleteOutlined,DownloadOutlined,SelectOutlined } from '@ant-design/icons';
import DeleteModal from '../common/DeleteModal'
import CreateStockModal from './CreateStockModel'
import { StockOrderModel } from '../../models/stock_order_model'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
const { Title } = Typography;


const StockOrder = () => {
  const [open, setOpen] = useState(false);

  const [stockOrders, setStockOrders] = useState<StockOrderModel[]>([])
  const [selectedOrder, setSelectedOrder] = useState<any>();
  const [deleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);



  const openCloseEditModal = async () => {
    await refresher();
    setIsEditModalOpen(!isEditModalOpen);
  }

  const handleOk = async () => {
    await refresher();
    setOpen(false)
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  const generatePdf = () => {
    const doc = new jsPDF()
    autoTable(doc, {
      columns: [
        { header: 'Name', dataKey: 'name' },
        { header: ' Price', dataKey: 'price' },
        { header: 'Manufacturer', dataKey: 'manufacturer' },
        { header: 'Order_qty', dataKey: 'orderqty' },


      ],
      body: stockOrders.map(stock => {
        return {
          name: stock.name,
          price: stock.price,
          manufacturer: stock.manufacturer,
          orderqty: stock.orderqty,
        };
      })
    })
    doc.save('stockDetails.pdf')
  }

  const columns: ColumnsType<StockOrderModel> = [
    {
      title: "Item ID",
      dataIndex: "_id",
      key: "id",
    },
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
      title: "Instock Quantity",
      dataIndex: "orderqty",
      key: "orderqty",
    },
    {
      title: "Actions",
      key: "status",
      render: (_, record: StockOrderModel) => {
        return <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => {
            const d: StockOrderModel = {
              _id: record._id,
              name: record.name,
              price: record.price,
              manufacturer: record.manufacturer,
              orderqty: record.orderqty,
              companyId: record.companyId,
            }
            setSelectedOrder(d)
            setIsEditModalOpen(true)
          }}></Button>
          <Button icon={<DeleteOutlined />} onClick={() => {
            const d: StockOrderModel = {
              _id: record._id,
              name: record.name,
              price: record.price,
              manufacturer: record.manufacturer,
              orderqty: record.orderqty,
              companyId: record.companyId,
            }
            setSelectedOrder(d)
            setIsDeleteModalOpen(true)
          }}></Button>
        </Space>
      }
    },
  ]


  const deleteDeliveryOrder = async () => {
    await StockOrderService.deleteOrderQty(selectedOrder?._id!);
    await refresher()
    setIsDeleteModalOpen(false)
  }

  const refresher = async () => {
    await StockOrderService.getOrderQty(0, 10)
      .then((val) => {
        setStockOrders([...val])
      });
  }


  useEffect(() => {
    StockOrderService.getOrderQty(0, 10)
      .then((val) => {
        setStockOrders([...val])
      });
  }, []);




  return (
    <WrapperContainer>
      <CustomRow style={{padding : "16px 0"}}>
        <Title level={3}>Stock Orders</Title>
        <div>
        <Tooltip title="Generate PDF">
          <Button style={{margin:"0 16px"}} onClick={generatePdf} shape="circle" icon={<DownloadOutlined/>} type="primary"/>
        </Tooltip>
        <Tooltip title="Add Stock Item">
          <Button type="primary" shape="circle" icon={<PlusCircleOutlined />} onClick={() => { setOpen(true) }} />
        </Tooltip>
        </div>
      </CustomRow>
      <Table columns={columns} className="table" dataSource={stockOrders} />
      <CreateStockModal
        shouldOpen={open}
        handleCancel={handleCancel}
        handleOk={handleOk} />
      <CreateStockModal
        shouldOpen={isEditModalOpen}
        handleCancel={openCloseEditModal}
        handleOk={openCloseEditModal}
        order={selectedOrder}
      />
      <DeleteModal isModalOpen={deleteModalOpen} handleOk={deleteDeliveryOrder} handleCancel={() => { console.log("cale"); setIsDeleteModalOpen(false) }} text={"Delete stock order"} />
    </WrapperContainer>
  )
}

export default StockOrder