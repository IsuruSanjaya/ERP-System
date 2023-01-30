import React, { useEffect, useState } from 'react'
import { PlusCircleOutlined } from '@ant-design/icons';
import CustomRow from '../common/Row';
import WrapperContainer from '../common/WrapperContainer'
import { Button, Space, Tooltip, Input } from 'antd'
import { Typography } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import { CustomeModel } from '../../models/customer_model';
import AddCustomerModal from './AddCustomerModal';
import CustomerService from '../../services/customer_service';
import { EditOutlined, DeleteOutlined, DownloadOutlined, SelectOutlined } from '@ant-design/icons';
import DeleteModal from '../common/DeleteModal';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const { Title } = Typography;




const Customer = () => {
  const [customers, setCustomers] = useState<CustomeModel[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomeModel>();
  const [isEditModalOpen, setIsEditaModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteAddModalOpen] = useState<boolean>(false);



  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState<boolean>(false);

  const openAddCuastomerModal = async () => {
    await refresher();
    setIsAddCustomerOpen(!openAddCuastomerModal);
  }

  const closeAddCustomerModal = async () => {
    await refresher();
    setIsAddCustomerOpen(false);
  }




  const generatePdf = () => {
    const doc = new jsPDF()
    autoTable(doc, {
      columns: [
        { header: 'Name', dataKey: 'name' },
        { header: 'Nic', dataKey: 'nic' },
        { header: 'Mobile', dataKey: 'mobile' },
        { header: 'Email', dataKey: 'email' },
        { header: 'Address', dataKey: 'address' },
      ],
      body: customers.map(customer => {
        return {
          name: customer.name,
          nic: customer.nic,
          mobile: customer.mobile,
          email: customer.email,
          address: customer.address,
        };
      })
    })
    doc.save('customerDetails.pdf')
  }


  const columns: ColumnsType<CustomeModel> = [
    // {
    //   title: "ID",
    //   dataIndex: "_id",
    //   key: "id"
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
      title: "NIC",
      dataIndex: "nic",
      key: "nic"
    },
    {
      title: "Mobile Numer",
      dataIndex: "mobile",
      key: "mobile-number"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Actions",
      key: "status",
      render: (_, record: CustomeModel) => {
        return <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => {
            const d: CustomeModel = {
              _id: record._id,
              name: record.name,
              date: record.date,
              address: record.address,
              companyId: record.companyId,
              nic: record.nic,
              email: record.email,
              mobile: record.mobile,
            }
            setSelectedCustomer(d)
            setIsEditaModalOpen(true)
          }}></Button>
          <Button icon={<DeleteOutlined />} onClick={() => {
            const d: CustomeModel = {
              _id: record._id,
              name: record.name,
              date: record.date,
              address: record.address,
              companyId: record.companyId,
              nic: record.nic,
              email: record.email,
              mobile: record.mobile,

            }
            setSelectedCustomer(d);
            setDeleteAddModalOpen(true)
          }}></Button>
        </Space>
      }
    },
  ]

  const deleteCustomer = async () => {

    await CustomerService.deleteCustomer(selectedCustomer?._id!)
    await refresher()
    setDeleteAddModalOpen(false);
  }


  const refresher = async () => {
    await CustomerService.getCustomers(1, 10).then(result => {
      setCustomers([...result])
    });
  }

  useEffect(() => {
    CustomerService.getCustomers(1, 10).then(result => {
      setCustomers([...result])
    });
  }, [])

  return (
    <WrapperContainer>
      <CustomRow>
        <Title level={3}>Customers</Title>
        <div>
        <Tooltip title="Generate PDF">
          <Button  style={{margin : "0 16px"}} onClick={generatePdf} shape="circle" icon={<DownloadOutlined />} type="primary" />
        </Tooltip>
          <Tooltip title="Add Customer">
            <Button type="primary" shape="circle" icon={<PlusCircleOutlined />} onClick={() => { setIsAddCustomerOpen(true) }} />
          </Tooltip>
        </div>
      </CustomRow>
      <Table columns={columns} className="table" dataSource={customers} />
      <AddCustomerModal handleOk={async () => { await refresher(); setIsAddCustomerOpen(false); }} handleCancel={closeAddCustomerModal} isOpen={isAddCustomerOpen} />
      <AddCustomerModal handleOk={async () => { await refresher(); setIsEditaModalOpen(false); }} handleCancel={() => { setIsEditaModalOpen(false); }} isOpen={isEditModalOpen} customer={selectedCustomer} />
      <DeleteModal isModalOpen={isDeleteModalOpen} handleCancel={() => { setDeleteAddModalOpen(false) }} handleOk={deleteCustomer} text="Do you want t delete this customer ?" />
    </WrapperContainer>
  )
}

export default Customer