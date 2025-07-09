import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
    },
  });
}

export async function POST(request: Request) {
  try {
    const apiKey = request.headers.get("Authorization")?.split(" ")[1];

    if (!apiKey) {
      return NextResponse.json(
        { message: "Clé API requise." },
        {
          status: 401,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const { title, description, projectId } = await request.json();

    if (!title || !description || !projectId) {
      return NextResponse.json(
        { message: "titre , description et projectId sont requis" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        apiKey: apiKey,
      },
    });

    if (!project)
      return NextResponse.json(
        { message: `le projet n'existe pas ${projectId}` },
        {
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

    await prisma.bug.create({
      data: {
        title: title,
        description: description,
        projectId: projectId,
      },
    });
    return NextResponse.json(
      { message: "Bug enregistrée" },
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "erreur interne du serveur" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
