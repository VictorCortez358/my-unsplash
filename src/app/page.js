import React from "react";
import Header from "@/components/Header";
import ImagesGallery from "@/components/ImagesGallery";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const loadImages = async () => {
    return await prisma.image.findMany();
};

export const dynamic = 'force-dynamic';

export default async function Home() {

    const images = await loadImages();
    return (
        <div>
            <ImagesGallery images={images} />
        </div>
    );
}
