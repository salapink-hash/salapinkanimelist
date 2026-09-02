import prisma from "@/libs/prisma"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const { anime_mal_id, user_email, comment, username, anime_title } = await request.json()

  const data = { anime_mal_id, user_email, comment, username, anime_title }

  const createComment = await prisma.comment.create({ data })

  if (!createComment) {
    return NextResponse.json({ status: 500, isCreated: false })
  }

  return NextResponse.json({ status: 200, isCreated: true })
}

export async function DELETE(request: Request) {
  const { id } = await request.json()

  const deleteComment = await prisma.comment.delete({
    where: { id: Number(id) }
  })

  if (!deleteComment) {
    return NextResponse.json({ status: 500, isDeleted: false })
  }

  return NextResponse.json({ status: 200, isDeleted: true })
}
