"use client";
import BugFilter from "@/app/components/BugFilter";
import WrapperMain from "@/app/components/wrapper/WrapperMain";
import { getProjectById } from "@/app/server";
import { Project } from "@/lib/type";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function page({ params }: { params: Promise<{ projectId: string }> }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setIsLoading] = useState<Boolean>(false);

  const fetchProject = async (projectId: string) => {
    setIsLoading(true);
    try {
      const data: Project | null = await getProjectById(projectId);

      if (!data) {
        throw new Error("Projet introuvable");
      }

      setProject(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const parametre = await params;
      fetchProject(parametre.projectId);
    };
    fetchData();
  }, [params]);

  return (
    <WrapperMain>
      {loading && (
        <div className="flex  flex-col gap-4 w-full">
  <div className="skeleton h-32 w-full"></div>
  <div className="skeleton h-4 w-28"></div>
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>
</div>
      )}

      {!loading && project && (
        <div>
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link href={"/"}>Vos projets</Link>
              </li>
              <li>
                <Link href={"/"}> {project.name} </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col md:flex-row">
            <BugFilter project={project} fetchProject={fetchProject} />
          </div>
        </div>
      )}
    </WrapperMain>
  );
}

export default page;
