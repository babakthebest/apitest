import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";
import { User } from "@prisma/client";

export async function POST(req: NextRequest) {
  const data: User = await req.json();
  // console.log(data);
  try {
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        isAdmin: false,
      },
    });
    return NextResponse.json(newUser);
  } catch (error) {
    console.log(error);
    return { error };
  }

  //   return NextResponse.json({ name: "new user added" });
}
