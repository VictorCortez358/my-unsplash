import React from "react";
import { Button, Form, Input, message } from "antd";
import "./styles/ImagesGallery.css";

const generatePassword = () => {
    const length = 8;
    const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let retVal = "";
    for (let i = 0; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return retVal;
};

const copyToClipboard = (password) => {
    navigator.clipboard.writeText(password);
};

const UploadForm = ({ handleOk, handleCancel, setImageList}) => {
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values) => {
        const password = generatePassword();
        const { label, url } = values;
        const response = await fetch("/api/upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ label, url, password }),
        });

        const data = await response.json();
        setImageList((prev) => [...prev, data]);
        try {
            if (data.error) {
                message.error(data.error);
            } else {
                messageApi.open({
                    type: "success",
                    content: `This is the password: ${password} for this image and it will be copied to your clipboard, please save it!`,
                    duration: 8,
                });
                copyToClipboard(password);
            }
        } catch (error) {
            message.error("Something went wrong, probably the URL is not valid, your url must start with http:// or https://");
        }
    };

    return (
        <Form
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            clearOnDestroy={true}
            autoComplete="off"
            style={{
                marginTop: "20px",
            }}
        >
            <Form.Item
                label="Label"
                name="label"
                rules={[
                    {
                        required: true,
                        message: "Please input a label!",
                    },
                ]}
            >
                <Input placeholder="Enter the label"/>
            </Form.Item>
            <Form.Item
                label="Photo URL"
                name="url"
                rules={[
                    {
                        required: true,
                        message: "Please input URL!",
                    },
                ]}
            >
                <Input placeholder="Enter a valid URL"/>
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
                        backgroundColor: "#3db46d",
                        color: "#fff",
                        padding: "0 20px",
                    }}
                    onClick={() => {
                        handleOk();
                    }}
                >
                    Submit
                </Button>
            </Form.Item>
            {contextHolder}
        </Form>
    );
};

export default UploadForm;
