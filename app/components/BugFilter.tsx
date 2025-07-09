"use client"
import { Bug, Project } from "@/lib/type";
import React, { useState } from "react";
import { Tab, Tabs } from "./Tabs";
import BugTable from "./BugTable";
import { changeStatus, deleteProject } from "../server";
import CodeBlog from "./codeBlog";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type BugFilterType = {
  project: Project;
  fetchProject: (id: string) => void;
};
function BugFilter({ project, fetchProject }: BugFilterType) {
  const [updatedBugs, setUpdatedBugs] = useState<Bug[]>(project.bugs);
  const env1 = `NEXT_PUBLIC_BUG_PROJECT_ID=${project.id}`;
  const env2 = `NEXT_PUBLIC_BUG_API_KEY=${project.apiKey}`;
  const [confirmationName, setconfirmationName] = useState("");
  const [isDelecting, setisDelecting] = useState(false);

  const router = useRouter()


  const getFilterBugs = (filter: string) => {
    switch (filter) {
      case "enattente":
        return updatedBugs
          .filter((bug) => bug.status === 1)
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      case "corrige":
        return updatedBugs
          .filter((bug) => bug.status === 2)
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      case "tous":
        return [...updatedBugs].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      default:
        return updatedBugs;
    }
  };

  const handleStatutChange = async (bugIds: string[], newStatus: number) => {
    try {
      await changeStatus(bugIds, newStatus);
      await fetchProject(project.id);
    } catch (e) {
      console.error(e);
    }
  };

   const handledeleteProjet = async (id: string) => {
    if(confirmationName != project.name){
        alert("le nom saisi ne correspond pas au nom du projet");
        return
    }
    setisDelecting(true);

    try {
      await deleteProject(project.id);

      
      router.push('/');
     
    } catch (e) {
      console.error(e);
    }finally{

        setisDelecting(false)
    }
  };
  

  return (
    <div className="w-full ">
      <Tabs>
        <Tab label={"En attente"}>
          <BugTable
            bugs={getFilterBugs("enattente")}
            handleStatutChange={handleStatutChange}
          />
        </Tab>
        <Tab label={"Corrigé"}>
          <BugTable
            bugs={getFilterBugs("corrige")}
            handleStatutChange={handleStatutChange}
          />
        </Tab>
        <Tab label={"Tous les bugs"}>
          <BugTable
            bugs={getFilterBugs("tous")}
            handleStatutChange={handleStatutChange}
          />
        </Tab>
        <Tab label={"Paramètres"}>
          <div className="flex gap-2">
             <h1>Copier ces variables dans votre fichier</h1>
             <code className="text-primary">.env</code>
          </div>
         
          <CodeBlog enV1={env1} enV2={env2} />
          <div className="flex justify-between flex-col  md:flex-row items-center border p-4 border-error/30 rouded-xl">
            <div className="flex flex-col gap-0.5">
              <p className="font-bold">Supprimer ce projet</p>
              <h2 className="text-sm">
               Une fois un projet supprimé, cette action est irréversible. Veuillez vous assurer de votre décision avant de procéder.
              </h2>
            </div>
            <button
              onClick={() =>
                (
                  document.getElementById("my_modal_3") as HTMLDialogElement
                ).showModal()
              }
              className="btn btn-error btn-sm btn-soft w-full md:w-fit font-bold mt-4 md-mt-0"
            >
              Supprimer le projet
            </button>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg ">Suppression</h3>
                <p className="py-4">
                  Pour confirmer la suppression du projet , veuillez saisir le
                  nom exactt du projet : <strong> {project.name}</strong>
                </p>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    className="input input-bordered w-full input-sm"
                    placeholder="Nom du projet"
                    value={confirmationName}
                    onChange={(e)=>setconfirmationName(e.target.value)}
                    disabled ={isDelecting}
                  />
                  <button  onClick={()=>handledeleteProjet(project.id)} className="btn btn-sm btn-error btn-soft font-bold">{!isDelecting ? "supprimer le projet":<Loader className="animate-spin w-4 h-4"/>}</button>
                </div>
              </div>
            </dialog>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default BugFilter;
