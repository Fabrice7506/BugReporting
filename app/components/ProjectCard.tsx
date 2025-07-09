import { formatRelativeDate } from "@/lib/function";
import { Project } from "@/lib/type";
import { Check, ClockFading, Loader } from "lucide-react";
import Link from "next/link";
import React from "react";

type ProjectCardType = {
  project: Project;
};
function ProjectCard({ project }: ProjectCardType) {
  const totalBug = project.bugs.length;
  const BugsEnAttente = project.bugs.filter((bug) => bug.status === 1).length;
  const Bugsresolu = project.bugs.filter((bug) => bug.status === 2).length;

  const pourcBugsEnAttente =
    totalBug > 0 ? (BugsEnAttente / totalBug) * 100 : 0;
  const pourcBugsresolu = totalBug > 0 ? (Bugsresolu / totalBug) * 100 : 0;

  const lastBug =
    project.bugs.length > 0
      ? project.bugs.reduce((lastest, bug) =>
          new Date(bug.createdAt) > new Date(lastest.createdAt) ? bug : lastest
        )
      : null;

  return (
    
    <Link
      href={`/project/${project.id}`}
      className="flex flex-col p-4 rounded-2xl border-0 bg-base-200 hover:shadow-md transition"
    >
      <div key={project.id} className="flex justify-between items-center">
        <h3 className="font-bold">{project.name} </h3>
        <span className="flex items-baseline ">
          <h1 className="font-semibold text-lg">{totalBug} Bugs </h1>
          <span className="text-xs ml-2">au total</span>
        </span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="w-full h-4 rounded overflow-hidden bg-primary/40">
          <div
            style={{ width: `${pourcBugsEnAttente + 0}%` }}
            className="bg-primary h-full"
          ></div>
        </div>

        <div className="flex md:justify-between flex-col md:flex-row gap-2 md:gap-0 text-xs mt-1">
          <div className="btn btn-neutral btn-sm">
            <span className="badge"> {BugsEnAttente} </span>
            <span>En attente</span>
            <span className="badge badge-sm font-bold">
              {pourcBugsEnAttente.toFixed(0)}%
            </span>
          </div>
          <div className="btn btn-neutral btn-sm">
            <span className="badge"> {Bugsresolu} </span>
            <span>Corrigé</span>
            <span className="badge badge-sm font-bold">
              {pourcBugsresolu.toFixed(0)}%
            </span>
          </div>
        </div>

        {lastBug &&(
            <div className="bg-primary/10 p-5 rounded-2xl">
                <div className="badge badge-sm badge-neutral mb-2">
                <ClockFading className="w-4 h-4" />
                {formatRelativeDate(lastBug.createdAt)}
                </div>
                <div className="flex flex-col gap-1">
                    <h1 className="tex-md font-bold flex md:flex-row md:items-center flex-col-reverse md:gap-4 gap-2">
                        <span>{lastBug.title}</span>
                        <span className={`badge badge-sm badge-soft ${lastBug.status === 1 ? 'badge-error' : 'badge-success'}`}>
                            {lastBug.status === 1 ? 
                            <Loader className="animate-spin w-4 h-4" />
                         : <Check/>}
                           {lastBug.status === 1 ? 
                           "en attente"
                         : "corrigé"}
                         </span>
                    </h1>
                    <div>
                        <p className="text-sm font-mono">{lastBug.description} </p>
                    </div>
                </div>
            </div>
        )}
      </div>
    </Link>
  );
}

export default ProjectCard;
