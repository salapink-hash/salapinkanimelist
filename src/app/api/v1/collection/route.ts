import prisma from "@/libs/prisma"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const { anime_mal_id, user_email, anime_image, anime_title } = await request.json()

  const data = { anime_mal_id, user_email, anime_image, anime_title }

  const createCollection = await prisma.collection.create({ data })

  if (!createCollection) {
    return NextResponse.json({ status: 500, isCreated: false })
  }

  return NextResponse.json({ status: 200, isCreated: true })
}

export async function DELETE(request: Request) {
  const { id } = await request.json()

  const deleteCollection = await prisma.collection.delete({
    where: { id: Number(id) }
  })

  if (!deleteCollection) {
    return NextResponse.json({ status: 500, isDeleted: false })
  }

  return NextResponse.json({ status: 200, isDeleted: true })
}
