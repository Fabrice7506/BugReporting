"use server";

import prisma from "@/lib/prisma";
import { Project } from "@/lib/type";


export async function checkAndAddUser(email: string, name: string) {
  if (!email) return;

  try {
    const userExiste = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userExiste && name) {
      await prisma.user.create({
        data: {
          email: email,
          name: name,
        },
      });
    }
  } catch (e) {
    console.error(e);
  }
}

export async function addProject(email: string, projectName: string) {
  if (!email && !projectName) return;

  try {
    const userExiste = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userExiste) return;

     await prisma.project.create({
        data:{
            name : projectName,
            userId : userExiste.id
        }
    });

  } catch (e) {
    console.error(e);
  }
}

export async function getAllprojects(email: string): Promise<Project[]> {
     try {
    const userExiste = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userExiste) return [];

    const allProjectsWithBugs = await prisma.project.findMany({
        where:{
            userId : userExiste.id
        },
        include :{
            bugs : true
        }
    });


    return allProjectsWithBugs;

  } catch (e) {
    console.error(e);
    return [];
  }

}

export async function getProjectById(projectId: string): Promise<Project | null> {
     try {
    const projectIdExiste = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include : {
        bugs:true,
      }
    });

    if (!projectIdExiste) return null ;


    return projectIdExiste;

  } catch (e) {
    console.error(e);
    return null ;
  }

}

export async function changeStatus(bugIds: string[] , newStatus : number){
     try {
     await prisma.bug.updateMany({
      where: {
        id: { in: bugIds},
      },
      data : {
        status:newStatus,
      }
    });

  

  } catch (e) {
    console.error(e);
    return null ;
  }

}


export async function deleteProject(projectId : string){
  if(!projectId) return null;

     try {
     await prisma.project.delete({
      where: {
        id: projectId,
      },
     
    });

  

  } catch (e) {
    console.error(e);
    return null ;
  }

}