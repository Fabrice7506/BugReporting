'use client'
import React from "react";
import NavBar from "../navbar/NavBar";
import { Settings, SunDim } from "lucide-react";
import { useTheme } from "../themeContext";

type NavBarProps = {
  children: React.ReactNode;
};
function WrapperMain({ children }: NavBarProps) {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="min-h-sreen flex flex-col">
      <NavBar />
      <main className="px-5 md:px-[10%] mt-4 mb-10">{children}</main>
      <footer className="mt-auto"></footer>

      <button
        onClick={() =>
          (
            document.getElementById("my_modal_2") as HTMLDialogElement
          ).showModal()
        }
        className="btn btn-primary  md:hidden btn-circle fixed bottom-6 right-6 rounded-full shadow-lg z-50"
        title="Action rapide"
      >
        <Settings className="w-6 h-6 " />
      </button>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg flex items-center gap-2 justify-center text-primary"><SunDim className="w-10 h-10 text-amber-500" />Thème</h3>
          <select
            className="select select-bordered w-full mt-2"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            {themes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default WrapperMain;
