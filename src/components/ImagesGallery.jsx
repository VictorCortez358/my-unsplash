"use client";
import React, { useState, useEffect } from "react";
import "./styles/ImagesGallery.css";
import { Modal } from "antd";
import DeleteForm from "./DeleteForm";
import Header from "./Header";

const ImagesGallery = ({ images }) => {
    const [imageList, setImageList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setImageList(images);
    }, [images]);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <>
        <Header imageList={imageList} setImageList={setImageList} />
        <div className="gallery">
            {imageList.map((image) => (
                <div className="pics" key={image.id}>
                    <>
                        <button className="btn-delete" onClick={showModal}>
                            delete
                        </button>
                        <p>{image.label}</p>
                    </>
                    <img src={image.url}  alt={image.label} style={{ width: "100%" }} />
                </div>
            ))}
            <Modal
                title="Are you sure?"
                open={isModalOpen}
                footer={null}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <DeleteForm handleOk={handleOk} handleCancel={handleCancel} imageList={imageList} setImageList={setImageList}/>
            </Modal>
        </div>
        </>
    );
};

export default ImagesGallery;
