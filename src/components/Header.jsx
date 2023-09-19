"use client";
import React, { useState } from "react";
import Logo from "../../public/my_unsplash_logo.svg";
import Image from "next/image";
import { Input, Button, Modal } from "antd";
import UploadForm from "./UploadForm";


const Header = ({imageList, setImageList}) => {
    const { Search } = Input;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const filterImages = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/upload", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        const filteredImages = data.filter((image) =>
            image.label.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setImageList(filteredImages);
    };

    return (
        <div className="flex flex-row justify-between pt-6 pb-8 px-14">
            <div className="flex flex-row items-center justify-center">
                <Image src={Logo} alt="My Unsplash Logo" />
                <Search
                    placeholder="Search the title of the image"
                    onChange={(e) => filterImages(e)}
                    style={{
                        width: 300,
                        marginLeft: "20px",
                    }}
                    size="large"
                />
            </div>
            <div className="flex flex-row items-center justify-center">
                <Button
                    type="default"
                    onClick={showModal}
                    style={{
                        backgroundColor: "#3db46d",
                        color: "#fff",
                        padding: "0 20px",
                    }}
                >
                    Add photo
                </Button>
            </div>
            <Modal
                open={isModalOpen}
                title={"Add new photo"}
                footer={null}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <UploadForm setImageList={setImageList} handleOk={handleOk} handleCancel={handleCancel} />
            </Modal>
        </div>
    );
};

export default Header;
