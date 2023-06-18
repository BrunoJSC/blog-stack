import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("Error");
  }
}

export const GET = async (req: Request, res: NextResponse) => {
  console.log("GET /api/blog");

  try {
    await main();

    const post = await prisma.post.findMany();
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  console.log("POST /api/blog");

  try {
    const { title, description } = await req.json();
    await main();

    const post = await prisma.post.create({
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
