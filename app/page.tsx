"use client";
import { Loader, Plus } from "lucide-react";
import { toast } from "react-toastify";
import WrapperMain from "./components/wrapper/WrapperMain";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { addProject, getAllprojects } from "./server";
import { Project } from "@/lib/type";
import ProjectCard from "./components/ProjectCard";

export default function Home() {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress as string;
  const [projectName, setProjectName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [IsLoading, setIsLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProject = async () => {
    if (!email) return;
    setIsLoading(true);
    try {
      const Allproject = await getAllprojects(email);
      setProjects(Allproject);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      alert("Veuillez donner un nom à votre projet");
      return;
    }
    setIsSubmitting(true);

    try {
      await addProject(email, projectName);
      fetchProject();

      const modal = document.getElementById("project") as HTMLDialogElement;
      modal?.close();
      setProjectName("");
    } catch (e) {
      console.error(e);
    } finally {
      toast.success("Projet crée avec succès");
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchProject(); // Appelle ta fonction toutes les secondes
    }, 1000); // 1000 ms = 1 seconde

    return () => clearInterval(interval);
  }, [email]);

  return (
    <WrapperMain>
      <button
        className="btn btn-primary btn-sm btn-soft"
        onClick={() =>
          (document.getElementById("project") as HTMLDialogElement).showModal()
        }
      >
        {" "}
        <Plus className="w-4 h-4" /> Nouveau projet{" "}
      </button>

      <dialog id="project" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-2">
            Commencer par créer votre projet!
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Vous devez créer un projet pour commencer a collecter les bugs.
          </p>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Nom du projet (ex : mon projet)"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="input input-sm input-bordered w-full"
            />
            <button
              onClick={handleCreateProject}
              className="btn btn-primary btn-soft w-full mt-2"
            >
              {" "}
              {!isSubmitting ? (
                "Créer le projet"
              ) : (
                <Loader className="animate-spin w-6 h-6 text-primary" />
              )}
            </button>
          </div>
        </div>
      </dialog>

      {IsLoading ? (
        <div className="flex  flex-col gap-4 w-full">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-5">
          {projects.map((project, index) => (
            <ProjectCard project={project} key={index} />
          ))}
        </div>
      )}
    </WrapperMain>
  );
}
