import { Button, Input, Select, Space, Table, Tooltip } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React, { useEffect } from 'react'
import { EmployeeModel } from '../../models/employee_model'
import AddButton from '../common/AddButton'
import CustomRow from '../common/Row'
import WrapperCard from '../common/WrapperCard'
import WrapperContainer from '../common/WrapperContainer'
import { EditOutlined, DeleteOutlined ,DownloadOutlined,SelectOutlined} from '@ant-design/icons'
import AddUserModal from './AddUserModal'
import { useState } from "react"
import EmployeeService from '../../services/employee_service'
import DeleteModal from '../common/DeleteModal'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const roles: string[] = [
  "Supervisor",
  "Delivery boy",
  "Driver",
  "Marketing executive",
  "Cleaner",
]

const Users = () => {

  const [isAddUser, setIsAddUser] = useState<boolean>(false)
  const [employees, setEmployees] = useState<EmployeeModel[]>([])
  const [isEditUser, setIEditUser] = useState<boolean>(false)
  const [isDeleteUser, setIsDeletUser] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<EmployeeModel>()
  const addUser = async () => {
    await refresher();
    setIsAddUser(false);
  }

  const deleteUser = async () => {
    await EmployeeService.deleteEmployee(selectedUser?._id!);
    await refresher();
    setIsDeletUser(false)
  }

  const cancelUser = () => {
    setIsAddUser(false)
  }


  const refresher = async () => {
    await EmployeeService.getEmployees(1, 10).then((val) => {
      setEmployees([...val])
    })
  }

  const generatePdf = () => {
    const doc = new jsPDF()
    autoTable(doc, {
      columns: [
        { header: 'Name', dataKey: 'name' },
        { header: ' Nic', dataKey: 'nic' },
        { header: 'Age', dataKey: 'age' },
        { header: 'Salary', dataKey: 'salary' },
        { header: 'Role', dataKey: 'role' },
        { header: 'Address', dataKey: 'address' },
        { header: 'Contact_Number', dataKey: 'contactNumber' },


      ],
      body: employees.map(employee => {
        return {
          name: employee.name,
          nic: employee.nic,
          age: employee.age,
          salary: employee.salary,
          role: employee.role,
          address: employee.address,
          contactNumber: employee.contactNumber,




        };
      })
    })
    doc.save('UserDetails.pdf')
  }

  useEffect(() => {
    EmployeeService.getEmployees(1, 10).then((val) => {
      setEmployees([...val])
    })
  }, [])

  const columns: ColumnsType<EmployeeModel> = [
    // {
    //   title: "employee ID",
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
      title: "Nic",
      key: "nic",
      dataIndex: "nic"

    },
    {
      title: "Age (years)",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Salary (lkr)",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Role",
      key: "role",
      render: (_, record: EmployeeModel) => {
        return (<Select
          defaultValue={record.role}
          onChange={async (val) => {
            const e: EmployeeModel = {
              name: record.name,
              nic: record.nic,
              address: record.address,
              contactNumber: record.contactNumber,
              role: val,
              age: record.age,
              salary: record.salary,
            }
            await EmployeeService.updateEmployee(record._id!, e);
            await refresher();
          }}>
          {
            roles.map(rol => {
              return <Select.Option key={rol} value={rol}>{rol}</Select.Option>
            })
          }
        </Select>)
      }
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "",
      key: "actions",
      render: (_, record: EmployeeModel) => {
        return <Space size="middle">
          <Button icon={<EditOutlined key={record._id} />} onClick={() => {
            setSelectedUser(record)

            setIEditUser(true)
          }}></Button>
          <Button icon={<DeleteOutlined key={record._id} />} onClick={() => {
            setSelectedUser(record)
            setIsDeletUser(true)

          }}></Button>
        </Space>
      }
    },
  ];

  return (
    <WrapperContainer>
      <WrapperCard>
        <CustomRow style={{ justifyContent: "space-between", padding: "16px" }} >
          <h1>Users</h1>
          <div>
          <Button style={{margin:"0 16px"}} onClick={generatePdf} shape="circle" icon={<DownloadOutlined/>} type="primary"/>
          <Tooltip title="Add user">
          <AddButton onClick={() => { setIsAddUser(true) }} />
          </Tooltip>
          </div>
        </CustomRow>
        <Table dataSource={employees} columns={columns} style={{ width: "100%", height: "100%" }} />
      </WrapperCard>
      <AddUserModal handleOk={addUser} handleCancel={cancelUser} isOpen={isAddUser} />
      <AddUserModal handleOk={async () => { await refresher(); setIEditUser(false) }} handleCancel={() => { setIEditUser(false) }} isOpen={isEditUser} employee={selectedUser} />
      <DeleteModal handleCancel={() => { setIsDeletUser(false) }} handleOk={deleteUser} text="Delete employee" isModalOpen={isDeleteUser} />
    </WrapperContainer>
  )
}

export default Users