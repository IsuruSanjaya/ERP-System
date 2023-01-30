import { Button, Col, Form, Input, Row } from 'antd'

import React, { useState } from "react";
import "./SignIn.css"
import image from "../../Assets/Logo.png"
import AuthService from '../../services/authservice';
import NotificationService from '../../services/notification_servce';
import { reactLocalStorage } from 'reactjs-localstorage';

interface Props {
    stateChanger: () => void
}

const Signin = ({ stateChanger }: Props) => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const login = () => {
        if (email !== "" && password !== "") {
            AuthService.login(email, password).then((val) => {
                if (val === 200) {
                    stateChanger()
                    reactLocalStorage.set('kog', true);
                } else {
                    NotificationService.openNotification("Login Failed", "Something went wrong please try again")
                }
            })
        }
    }
    return (
        <div className="WrapperContainer">
            <img src={image} width={200} /> <br /><br /><br /><br /><br /><br /><br /><br />

            <div className='card'>

                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='vertical'
                >

                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label={<label style={{ color: "white", fontSize: 18 }}>Email</label>}
                                name="username"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input
                                    style={{ width: "100%" }}
                                    onChange={(val) => {
                                        setEmail(val.target.value)
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label={<label style={{ color: "white", fontSize: 18 }}>Password</label>}
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password onChange={(val) => {
                                    setPassword(val.target.value)
                                }} /><br /><br />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Form.Item>
                                <Button style={{ width: "100%" }} type="primary" htmlType="submit"
                                    onClick={() => {
                                        login()
                                    }}
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </div>
        </div>
    )
}

export default Signin