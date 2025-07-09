import { Bug } from "@/lib/type";
import { Check, ListFilter, Loader } from "lucide-react";
import React, { useMemo, useState } from "react";

type BugTableType = {
  bugs: Bug[];
  handleStatutChange : (idGroup: string[], newStatus:number)=> void
};

const groupBugs = (bugs: Bug[]) => {
  const groups: Record<string, Bug[]> = {};

  bugs.forEach((bug) => {
    const groupKey = `${bug.title} - ${bug.description} - ${new Date(
      bug.createdAt
    ).toDateString()}`;

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }

    groups[groupKey].push(bug);
  });
  return Object.entries(groups);
};
const BugTable = ({ bugs , handleStatutChange }: BugTableType) => {
  const [sortAsc, setSortAsc] = useState(false);
  const pageSize = 10;
  const [currentPage, setcurrentPage] = useState(1);
  const [editingKey, setEditingKey] = useState<string | null>(null);

  if (bugs.length == 0) {
    return <p className="text-gray-500">0 bug trouvé.</p>;
  }

 const groupedBugs = useMemo(() => {
  return groupBugs(bugs);
}, [bugs]);

const trieGroup = useMemo(() => {
  if (!groupedBugs || groupedBugs.length === 0) return [];

  return [...groupedBugs].sort(([, groupeA], [, groupeB]) => {
    const dateA = new Date(groupeA[0].createdAt).getTime();
    const dateB = new Date(groupeB[0].createdAt).getTime();

    return sortAsc ? dateA - dateB : dateB - dateA;
  });
}, [groupedBugs, sortAsc]);


  const totalPages = Math.ceil(trieGroup.length / pageSize);
  const pageGroups = trieGroup.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const bugsTotal = bugs.length;
  const bugsDisplayBefore = trieGroup
    .slice(0, (currentPage - 1) * pageSize)
    .reduce((acc, [, group]) => acc + group.length, 0);

  const bugDisplayCurrent = pageGroups.reduce(
    (acc, [, group]) => acc + group.length,
    0
  );

  const bugsRestant = bugsTotal - bugDisplayCurrent - bugsDisplayBefore ;

  const goPrev = () => setcurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setcurrentPage((p) => Math.min(totalPages, p + 1));

  const onchangeStatut = (key:string , allIds : string[] , newStatus : number) =>{
    handleStatutChange(allIds,newStatus)
    setEditingKey(null)
  }

  return (
    <>
      <div className="overflow-x-auto border border-primary/20 rounded-xl  ">
        <table className="table w-full">
          <thead>
            <tr>
              <th>N°</th>
              <th>Nombre</th>
              <th>Description</th>
              <th
                className="cursor-pointer select-none flex gap-2 items-center"
                onClick={() => setSortAsc(!sortAsc)}
              >
                <span>Date</span>
                <ListFilter
                  className={`w-4 h-4 text-primary transition-transform duration-300 ${
                    sortAsc ? "rotate-0" : "rotate-180"
                  }`}
                />
              </th>
              <th>Statut du bug</th>
            </tr>
          </thead>
          <tbody>
            {pageGroups.map(([key, group], index) => {
              const firstBug = group[0];
              const statut = firstBug.status;
              const allIds = group.map((b) => b.id);

              const isEditing = editingKey === key;
              return (
                <tr key={key} className="hover:bg-base-100 transition-colors">
                  <td>{(currentPage - 1) * pageSize + index + 1}</td>
                  <td>
                    <span className="badge badge-primary">{group.length} </span>
                  </td>
                  <td>
                    <div className="flex flex-col gap-1 ">
                      <h1 className="font-bold text-md">{firstBug.title}</h1>
                      <div>
                        <p className="font-mono text-sm">
                          {" "}
                          {firstBug.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>{new Date(firstBug.createdAt).toLocaleDateString()}</td>
                  <td className="w-fit">
                    {!isEditing ? (
                      <span
                        onClick={() => setEditingKey(key)}
                        className={`badge badge-sm badge-soft ${
                          statut === 1 ? "badge-error" : "badge-success"
                        }`}
                      >
                        {statut === 1 ? (
                          <Loader className="animate-spin w-4 h-4" />
                        ) : (
                          <Check />
                        )}
                        {statut === 1 ? "en attente" : "corrigé"}
                      </span>
                    ) : (
                      <select
                        className="select select-xs select-bordered w-fit"
                        value={statut}
                        onBlur={() => setEditingKey(null)}
                          onChange={(e)=>onchangeStatut(key,allIds,Number(e.target.value))}
                      >
                        <option value={1}>En attente</option>
                        <option value={2}>Corrigé</option>
                      </select>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end mt-4">
        <div className="join grid grid-cols-2">
          <button className="join-item btn btn-outline btn-sm" onClick={goPrev}>Page précedente ({bugsDisplayBefore})</button>
          <button className="join-item btn btn-outline btn-sm"  onClick={goNext}>Suivante ({bugsRestant}) </button>
        </div>
      </div>
    </>
  );
};

export default BugTable;
