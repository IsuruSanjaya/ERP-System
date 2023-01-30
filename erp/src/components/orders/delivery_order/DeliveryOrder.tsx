import Table, { ColumnsType } from 'antd/lib/table'
import React, { useEffect, useState } from 'react'
import { DeliveryOrderModel } from '../../../models/delivery_order_model'
import DeliveryOrderService from '../../../services/delivery_order_service'
import CustomRow from '../../common/Row'
import { Input, Typography } from 'antd';
import WrapperContainer from '../../common/WrapperContainer'
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Tooltip, Space, Select } from 'antd';
import CreateDeliveryOrderModal from './CreateDeliveryOrderModal'
import { EditOutlined, DeleteOutlined, DownloadOutlined, SelectOutlined } from '@ant-design/icons';
import DeleteModal from '../../common/DeleteModal'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const { Title } = Typography;


const DeliveryOrder = () => {
  const [open, setOpen] = useState(false);

  const [deliveryOrders, setDeliveryOrders] = useState<DeliveryOrderModel[]>([])
  const [selectedOrder, setSelectedOrder] = useState<any>();
  const [deleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);



  const openCloseEditModal = async () => {
    await refresher();
    setIsEditModalOpen(false);
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
        { header: 'Date', dataKey: 'date' },
        { header: 'Transaction_Date', dataKey: 'transactionDate' },
        { header: 'Customer', dataKey: 'coustomer' },
        { header: 'Shipping_Address', dataKey: 'shippingAddress' },
        { header: 'Total Bill', dataKey: 'totalBill' },
        { header: 'Status', dataKey: 'status' },

      ],
      body: deliveryOrders.map(order => {
        return {
          date: order.date.toString(),
          transactionDate: order.transactionDate.toString(),
          coustomer: order.coustomer,
          shippingAddress: order.shippingAddress,
          totalBill: order.totalBill,
          status: order.status,

        };
      })
    })
    doc.save('DeliveryOrderDetails.pdf')
  }


  const columns: ColumnsType<DeliveryOrderModel> = [
    // {
    //   title: "Order ID",
    //   dataIndex: "_id",
    //   key: "id",
    // },
    {
      title: "Placed Date",
      key: "placed-date",

      render: (_, record: DeliveryOrderModel) => {
        return <div>{record.date.toString().split("T")[0]}</div>
      }

    },
    {
      title: "Transaction Date",
      key: "transactionDate",
      render: (_, record: DeliveryOrderModel) => {
        return <div>{record.transactionDate.toString().split("T")[0]}</div>
      }

    },
    {
      title: "Customer Name",
      dataIndex: "coustomer",
      key: "customer",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
        return <>
          <Input
            value={selectedKeys[0]}
            onChange={(val) => {
              setSelectedKeys(val.target.value ? [val.target.value] : [])
              confirm({ closeDropdown: false })
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
          <Button type="ghost"
            onClick={() => { }}>Reset
          </Button>

        </>
      },
      filterIcon: () => {
        return <SelectOutlined style={{ color: "red" }} />
      },
      onFilter: (value, record) => {
        return record.coustomer.toLowerCase().includes(value.toString().toLowerCase())
      }
    },
    {
      title: "Shipping Address",
      dataIndex: "shippingAddress",
      key: "shipping-address",
    },
    {
      title: "Total Bill",
      dataIndex: "totalBill",
      key: "total-bill",
    },
    {
      title: "Order Status",
      key: "status",
      render: (_, record: DeliveryOrderModel) => {
        return (<Select
          defaultValue={record.status}
          onChange={async(val) => {
            if (val) {
              const order: DeliveryOrderModel = {
                _id: record._id,
                date: record.date,
                transactionDate: record.transactionDate,
                transactionType: record.transactionType,
                coustomer: record.coustomer,
                shippingAddress: record.shippingAddress,
                totalBill: record.totalBill,
                status: val,
                companyId: record.companyId,
              }
              await DeliveryOrderService.updateDeliverItem(record?._id!, order)
              await refresher()
            }
          }}
        >
          <Select.Option value={1}>Completed</Select.Option>
          <Select.Option value={0}>Not Completed</Select.Option>
        </Select>)
      }
    },
    {
      title: "Actions",
      key: "status",
      render: (_, record: DeliveryOrderModel) => {
        return <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => {
            const d: DeliveryOrderModel = {
              _id: record._id,
              date: new Date(record.date),
              transactionDate: new Date(record.transactionDate),
              transactionType: record.transactionType,
              coustomer: record.coustomer,
              shippingAddress: record.shippingAddress,
              status: record.status,
              totalBill: record.totalBill,
              companyId: record.companyId,
            }

            setSelectedOrder(d)
            setIsEditModalOpen(true)
          }}></Button>
          <Button icon={<DeleteOutlined />} onClick={() => {
            const d: DeliveryOrderModel = {
              _id: record._id,
              date: new Date(record.date),
              transactionDate: new Date(record.transactionDate),
              transactionType: record.transactionType,
              coustomer: record.coustomer,
              shippingAddress: record.shippingAddress,
              status: record.status,
              totalBill: record.totalBill,
              companyId: record.companyId,
            }
            setSelectedOrder(d);
            setIsDeleteModalOpen(true)
          }}></Button>
        </Space>
      }
    },
  ]


  const deleteDeliveryOrder = async () => {
    await DeliveryOrderService.deleteDeliveryItem(selectedOrder?._id!);
    await refresher()
    setIsDeleteModalOpen(false)
  }

  const refresher = async () => {
    await DeliveryOrderService.getDeliveryItems(0, 10)
      .then((val) => {
        setDeliveryOrders([...val])
      });
  }


  useEffect(() => {
    DeliveryOrderService.getDeliveryItems(0, 10)
      .then((val) => {
        setDeliveryOrders([...val])
      });
  }, []);

  return (
    <WrapperContainer>
      <CustomRow>
        <Title level={3}>Delivery Order</Title>
        <div>
          <Button style={{ margin: "0 16px" }} onClick={generatePdf} shape="circle" icon={<DownloadOutlined />} type="primary" />
          <Tooltip title="Add Delivery Order">
            <Button type="primary" shape="circle" icon={<PlusCircleOutlined />} onClick={() => { setOpen(true) }} />
          </Tooltip>
        </div>
      </CustomRow>
      <Table columns={columns} className="table" dataSource={deliveryOrders} />
      <CreateDeliveryOrderModal
        shouldOpen={open}
        confirmLoading={confirmLoading}
        handleCancel={handleCancel}
        handleOk={handleOk} />
      <CreateDeliveryOrderModal
        shouldOpen={isEditModalOpen}
        confirmLoading={false}
        handleCancel={openCloseEditModal}
        handleOk={openCloseEditModal}
        deliveryOrder={selectedOrder}
      />
      <DeleteModal isModalOpen={deleteModalOpen} handleOk={deleteDeliveryOrder} handleCancel={() => { console.log("cale"); setIsDeleteModalOpen(false) }} text={"Delete delivery order"} />
    </WrapperContainer>
  )
}

export default DeliveryOrder