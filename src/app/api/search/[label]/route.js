import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function GET(request, {params}){
    const task = await prisma.task.findUnique({
        where: {
            id: Number(params.id)
        }
    });
    return NextResponse.json(task);
}  