import React, { useEffect, useState } from 'react'


import { PlusCircleOutlined } from '@ant-design/icons';
import CustomRow from '../common/Row';
import WrapperContainer from '../common/WrapperContainer'
import { Button, Space, Tooltip } from 'antd'
import { Typography } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import { PhurchaseRequestModel } from '../../models/purchase_request';

import PurchaseRequestService from '../../services/purchase_request_service';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddPurchaseRequest from './AddPurchaseaRequest';
import DeleteModal from '../common/DeleteModal';
const { Title } = Typography;




const PurchaseRequest = () => {
  const [purchaseRequests, setPurchaseRequests] = useState<PhurchaseRequestModel[]>([]);
  const [selectedPurchaseRequest, setSelectedPurchaseRequest] = useState<PhurchaseRequestModel>();
  const [isEditModalOpen, setIsEditaModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteAddModalOpen] = useState<boolean>(false);

  const [isAddPurchaseRequestOpen, setIsAddPurchaseRequestOpen] = useState<boolean>(false);

  const openAddCuastomerModal = async () => {
    await refresher();
    setIsAddPurchaseRequestOpen(!openAddCuastomerModal);

  }

  const closeAddPurchaseRequest = async () => {
    await refresher();
    setIsAddPurchaseRequestOpen(false);
  }


  const deletePurchaseRequest = async () => {
    if (selectedPurchaseRequest) {
      await PurchaseRequestService.deletePurchaseRequest(selectedPurchaseRequest?._id!);
      await refresher()
      setDeleteAddModalOpen(false);
    }
  }

  const columns: ColumnsType<PhurchaseRequestModel> = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "id"
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseOrderDate",
      key: "purchase-date"
    },
    {
      title: "Supplier Name",
      dataIndex: "suppierName",
      key: "nic"
    },
    {
      title: "Store",
      dataIndex: "store",
      key: "store"
    },
    {
      title: "Net Amount",
      dataIndex: "netAmount",
      key: "netAmount"
    },

    {
      title: "Actions",
      key: "status",
      render: (_, record: PhurchaseRequestModel) => {
        return <Space size="middle">
          <Tooltip title="Add Purchase Request">
          <Button icon={<EditOutlined />} onClick={() => {
            const d: PhurchaseRequestModel = {
              _id: record._id,
              requestBy: record.requestBy,
              totalBill: record.totalBill,
              status: record.status,
              requestTo: record.requestTo,
              requestToId: record.requestToId
            }
            setSelectedPurchaseRequest(d)
            setIsEditaModalOpen(true)
          }}></Button>
          </Tooltip>
          <Button icon={<DeleteOutlined />} onClick={() => {
            const d: PhurchaseRequestModel = {
              _id: record._id,
              requestBy: record.requestBy,
              totalBill: record.totalBill,
              status: record.status,
              requestTo: record.requestTo,
              requestToId: record.requestToId
            }
            setSelectedPurchaseRequest(d);
            setDeleteAddModalOpen(true)
          }}></Button>
        </Space>
      }
    },
  ]

  const refresher = async () => {
    await PurchaseRequestService.getPurchaseRequests(1, 10).then(result => {
      setPurchaseRequests([...result])
    });
  }

  useEffect(() => {
    PurchaseRequestService.getPurchaseRequests(1, 10).then(result => {
      setPurchaseRequests([...result])
    });
  }, [])

  return (
    <WrapperContainer>
      <CustomRow>
        <Title level={3}>PurchaseRequests</Title>
        <Tooltip title="Add Perchase Request">
          <Button type="primary" shape="circle" icon={<PlusCircleOutlined />} onClick={() => { setIsAddPurchaseRequestOpen(true) }} />
        </Tooltip>
      </CustomRow>
      <Table columns={columns} className="table" dataSource={purchaseRequests} />
      <AddPurchaseRequest handleOk={openAddCuastomerModal} handleCancel={closeAddPurchaseRequest} isOpen={isAddPurchaseRequestOpen} />
      <AddPurchaseRequest handleOk={async () => { await refresher(); setIsEditaModalOpen(false); }} handleCancel={() => { setIsEditaModalOpen(false); }} isOpen={isEditModalOpen} request={selectedPurchaseRequest} />
      <DeleteModal text='Delete purchase order' isModalOpen={isDeleteModalOpen} handleCancel={() => { setDeleteAddModalOpen(false) }} handleOk={deletePurchaseRequest} />
    </WrapperContainer>
  )
}

export default PurchaseRequest