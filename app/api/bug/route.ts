"use server"


import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";




export async function POST(request : Request){

    try{
        const apiKey = request.headers.get("Authorization")?.split(" ")[1];

        if(!apiKey){
            return NextResponse.json({message:"Clé API requise."},{status:401})
        }

        const {title,description,projectId} = await request.json();


        if(!title||!description||!projectId){
            return NextResponse.json({message:"titre , description et projectId sont requis"},{status:400});
        }

        const project = await prisma.project.findUnique({
            where : {
                id : projectId,
                apiKey : apiKey
            }
        })

        if(!project) return NextResponse.json({message:`le projet n'existe pas ${projectId}`},{status:404});

        await prisma.bug.create({
            data : {
                title : title,
                description : description,
                projectId: projectId
            }
        })
        return NextResponse.json({ message:"Bug enregistrée"},{status:201})

    }catch(e){
      
        console.error(e);
        return NextResponse.json({ message:"erreur interne du serveur"},{status:500})
    }
}