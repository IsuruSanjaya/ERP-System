import "./styles.css"
import logo from "../../Assets/Logo.png"

import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Typography } from 'antd';

import DashboardBody from "./DashboardBody";
import Customer from "../customers/Customer";
import DeliveryOrder from "../orders/delivery_order/DeliveryOrder";
import SalesOrder from "../orders/sales_order/SalesOrder";
import PurchaseOrder from "../orders/purchase_order/PurchaseOrder";
import PurchaseRequest from "../purchase_request/PurchaseRequest";
import PuchaseItems from "../purchase_item/PuchaseItems";
import Users from "../Users/Users";
import StockOrder from "../StockOrder/StockOrder";

import { BankTwoTone,UserOutlined ,MoneyCollectFilled,LineChartOutlined,StockOutlined,TeamOutlined ,ShoppingCartOutlined,CarFilled} from '@ant-design/icons'
import Home from "./home";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

interface Props {
    stateChanger : ()=>void
}

const Dashboard = ({stateChanger}:Props) => {
    function getItem(
        label: React.ReactNode,
        key: number,
        icon?: React.ReactNode,

    ): MenuItem {
        return {
            key,
            label,
            icon,
            onClick: () => { setActiveIndex(key) }
        } as MenuItem;
    }
    const items: MenuItem[] = [
        getItem('Dashboard', 0,<BankTwoTone />),
        getItem('Customers', 1,<UserOutlined />),
        getItem('Delivery Order', 2,<CarFilled />),
        getItem('Sales Order', 3,<LineChartOutlined />),
        getItem('Purchase Order', 4,<MoneyCollectFilled />),
        // getItem('Purchase Request', 5),
        getItem('Items', 6,<ShoppingCartOutlined />),
        getItem('Users', 7,<TeamOutlined />),
        getItem('Stock Orders   ', 8,<StockOutlined />),
    
    ];


    const [collapsed, setCollapsed] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const bodyContainer: JSX.Element[] = [
        <Home />,
        <Customer />,
        <DeliveryOrder />,
        <SalesOrder />,
        <PurchaseOrder />,
        <PurchaseRequest />,
        <PuchaseItems />,
        <Users />,
        <StockOrder/>,
    ];

    return (
        <>
            <Header className="site-layout-background">
                <img src={logo} alt="Logo" width={120} />
                
            </Header>
            <Layout style={{ minHeight: '90vh' }}>

                <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline" items={items} />
                </Sider>
                <Layout className="site-layout">

                    <Content style={{ margin: '0 16px' }}>
                        {bodyContainer[activeIndex]}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>ERP System ©2022 Created by Bug Busters</Footer>
                </Layout>
            </Layout>
        </>
    )
}

export default Dashboard