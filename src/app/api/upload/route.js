import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function GET() {
    const newPhoto = await prisma.image.findMany();
    return NextResponse.json(newPhoto);
}


export async function POST(request) {
    const { label, url, password } = await request.json();
    const NewPhoto = await prisma.image.create({
        data: {
            label,
            url,
            password,
        }
    });
    return NextResponse.json(NewPhoto);
}

export async function DELETE(request) {
    const { password } = await request.json();
    const deletePhoto = await prisma.image.delete({
        where: {
            password,
        }
    });

    return NextResponse.json(deletePhoto);
}