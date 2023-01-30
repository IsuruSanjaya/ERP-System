import React, { useEffect, useState } from 'react'


import { PlusCircleOutlined } from '@ant-design/icons';
import CustomRow from '../../common/Row';
import WrapperContainer from '../../common/WrapperContainer'
import { Button, Input, Space, Tooltip } from 'antd'
import { Typography } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import { PhurchaseOrderModel } from '../../../models/purchase_order';

import PurchaseOrderService from '../../../services/purchase_service';
import { EditOutlined, DeleteOutlined,SelectOutlined ,DownloadOutlined} from '@ant-design/icons';
import AddPurchaseOrder from './AddPurchaseOrder';
import DeleteModal from '../../common/DeleteModal';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
const { Title } = Typography;




const PurchaseOrder = () => {
  const [open, setOpen] = useState(false);

  const [purchaseOrders, setPurchaseOrders] = useState<PhurchaseOrderModel[]>([]);
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState<PhurchaseOrderModel>();
  const [isEditModalOpen, setIsEditaModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteAddModalOpen] = useState<boolean>(false);

  const [isAddPurchaseOrderOpen, setIsAddPurchaseOrderOpen] = useState<boolean>(false);

  const openAddCuastomerModal = async () => {
    await refresher();
    setIsAddPurchaseOrderOpen(!openAddCuastomerModal);

  }
  const handleOk = async() => {
    await refresher();
    setOpen(false)
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };


  const closeAddPurchaseOrder = async () => {
    await refresher();
    setIsAddPurchaseOrderOpen(false);
  }


  const deletePurchaseOrder = async () => {
    if (selectedPurchaseOrder) {
      await PurchaseOrderService.deleteDeliveryItem(selectedPurchaseOrder?._id!);
      await refresher()
      setDeleteAddModalOpen(false);
    }
  }
  const generatePdf = () => {
    const doc = new jsPDF()
    autoTable(doc, {
      columns: [
        { header: 'Purchase Order Date', dataKey: 'purchaseOrderDate' },
        { header: 'Supplier Name', dataKey: 'suppierName' },
        { header: 'Store', dataKey: 'store' },
        { header: 'Net amount', dataKey: 'netAmount' },
        { header: 'Status', dataKey: 'status' },

      ],
      body: purchaseOrders.map(pOrder => {
        return {
          purchaseOrderDate: pOrder.purchaseOrderDate.toString(),
          suppierName: pOrder.suppierName,
          store: pOrder.store,
          netAmount: pOrder.netAmount.toString(),
          status: pOrder.status? "Completed":"Not completed",

        };
      })
    })
    doc.save('PurchaseOrderDetails.pdf')
  }

  const columns: ColumnsType<PhurchaseOrderModel> = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "id"
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseOrderDate",
      key: "purchase-date",
      render: (_, record: PhurchaseOrderModel) => {
        return <div>{record.purchaseOrderDate.toString().split("T")[0]}</div>
      }
    },
    {
      title: "Supplier Name",
      dataIndex: "suppierName",
      key: "nic",
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
          <Button type="ghost"
            onClick={()=>  {}}>Reset
          </Button>
          
        </>
      },
      filterIcon: () => {
        return <SelectOutlined style={{ color: "red" }} />
      },
      onFilter: (value, record) => {
        return record.suppierName.toLowerCase().includes(value.toString().toLowerCase())
      },
      render: (_, record: PhurchaseOrderModel) => {
        return <div>{record.suppierName.toString().split("T")[0]}</div>
      }
    },
    {
      title: "Store",
      dataIndex: "store",
      key: "store",
      render: (_, record: PhurchaseOrderModel) => {
        return <div>{record.store.toString().split("T")[0]}</div>
      }
    },
    {
      title: "Net Amount",
      dataIndex: "netAmount",
      key: "netAmount",
      render: (_, record: PhurchaseOrderModel) => {
        return <div>{record.netAmount.toString().split("T")[0]}</div>
      }
    },

    {
      title: "Actions",
      key: "status",
      render: (_, record: PhurchaseOrderModel) => {
        return <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => {
            const d: PhurchaseOrderModel = {
              _id: record._id,
              purchaseOrderDate: record.purchaseOrderDate,
              suppierName: record.suppierName,
              store: record.store,
              netAmount: record.netAmount,
              status: record.status,
              companyId: record.companyId,
            }
            setSelectedPurchaseOrder(d)
            setIsEditaModalOpen(true)
          }}></Button>
          <Button icon={<DeleteOutlined />} onClick={() => {
            const d: PhurchaseOrderModel = {
              _id: record._id,
              purchaseOrderDate: record.purchaseOrderDate,
              suppierName: record.suppierName,
              store: record.store,
              netAmount: record.netAmount,
              status: record.status,
              companyId: record.companyId,

            }
            setSelectedPurchaseOrder(d);
            setDeleteAddModalOpen(true)
          }}></Button>
        </Space>
      }
    },
  ]

  const refresher = async () => {
    await PurchaseOrderService.getPurchaseOrders(1, 10).then(result => {
      setPurchaseOrders([...result])
    });
  }

  useEffect(() => {
    PurchaseOrderService.getPurchaseOrders(1, 10).then(result => {
      setPurchaseOrders([...result])
    });
  }, [])

  return (
    <WrapperContainer>
      <CustomRow>
        <Title level={3}>Purchase Orders</Title>
        <div>
          <Button style={{margin:"0 16px"}} onClick={generatePdf} shape="circle" icon={<DownloadOutlined/>} type="primary"/>
        <Tooltip title="Add Purchase Order">
          <Button type="primary" shape="circle" icon={<PlusCircleOutlined />} onClick={() => { setIsAddPurchaseOrderOpen(true) }} />
        </Tooltip>
        </div>
      </CustomRow>
      <Table columns={columns} className="table" dataSource={purchaseOrders} />
      <AddPurchaseOrder 
      handleOk={openAddCuastomerModal} handleCancel={closeAddPurchaseOrder} shouldOpen={isAddPurchaseOrderOpen} />
      <AddPurchaseOrder handleOk={async () => { await refresher(); setIsEditaModalOpen(false); }} handleCancel={() => { setIsEditaModalOpen(false); }} shouldOpen={isEditModalOpen} order={selectedPurchaseOrder} />
      <DeleteModal text='Delete purchase order' isModalOpen={isDeleteModalOpen} handleCancel={() => { setDeleteAddModalOpen(false) }} handleOk={deletePurchaseOrder} />
    </WrapperContainer>
  )
}

export default PurchaseOrder