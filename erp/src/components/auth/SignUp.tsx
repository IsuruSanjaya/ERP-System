import React, { useState } from 'react'
import { Button, Form, Input, Row, Col } from 'antd'

import "./SignUp.css";
import image from "../../Assets/Logo.png"

import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

interface Props {
    stateChanger: () => void
}

const SignUp = ({ stateChanger }: Props) => {

    const [imgUrl, setImgUrl] = useState<string>("");
    const [progresspercent, setProgresspercent] = useState<number>(0);

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const file = e.target[0]?.files[0]

        if (!file) return;

        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL)
                });
            }
        );
    }
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='container' >
            <img src={image} width={200} /> <br /><br /><br /><br />

            <div className='card'>
                <div className='card2'>
                    <Form
                        name="basic"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 22 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout='vertical'

                    >


                        <Row>
                            <Col span={11}>
                                <Form.Item
                                    label={<label style={{ color: "white", fontSize: 14 }}>Username</label>}
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={2} />

                            <Col span={11}>
                                <Form.Item
                                    label={<label style={{ color: "white", fontSize: 14 }}>Email</label>}
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={11}>
                                <Form.Item
                                    label={<label style={{ color: "white", fontSize: 14 }}>Password</label>}
                                    name="password"
                                    rules={[{ required: true, message: 'Please enter the password!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>
                            </Col>
                            <Col span={2} />
                            <Col span={11}>
                                <Form.Item
                                    label={<label style={{ color: "white", fontSize: 14 }}>Confirm Password</label>}
                                    name="cnfpassword"
                                    rules={[{ required: true, message: 'Please enter the password again to confirm!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>

                                <Form.Item>
                                    <Button style={{ width: "100%" }} type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                </div>
            </div>
        </div>

    )
}

export default SignUp