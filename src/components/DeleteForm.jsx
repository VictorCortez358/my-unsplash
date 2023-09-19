import React from "react";
import { Form, Input, Button, message } from "antd";

const DeleteForm = ({ handleOk, handleCancel, imageList, setImageList }) => {
    const deleteImage = async (password) => {
        const response = await fetch("/api/upload", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),
        });

        if (response.ok) {
            const newImages = imageList.filter(
                (image) => image.password !== password
            );
            setImageList(newImages);
            message.success("Image deleted successfully");
        } else {
            message.error("The password is not correct");
        }
    };

    const onFinish = async (values) => {
        const password = values.password;
        deleteImage(password);
    };

    return (
        <Form
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{
                marginTop: "20px",
            }}
        >
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        message: "Please input your password!",
                    },
                ]}
            >
                <Input.Password  placeholder="**********"/>
            </Form.Item>
            <Form.Item
                style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "end",
                }}
            >
                <Button
                    type="default"
                    style={{
                        padding: "0 20px",
                        marginRight: "10px",
                    }}
                    onClick={
                        () => {
                            handleCancel();
                        }
                    }
                >
                    Cancel
                </Button>
                <Button
                    type="default"
                    htmlType="submit"
                    style={{
                        backgroundColor: "#eb5757",
                        color: "#fff",
                        padding: "0 20px",
                    }}
                    onClick={() => {
                        handleOk();
                    }}
                >
                    Delete
                </Button>
            </Form.Item>
        </Form>
    );
};

export default DeleteForm;
