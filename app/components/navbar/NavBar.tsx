"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import LogoBrand from "../logo";
import { Links } from "../widget/Links";
import NavLinks from "./NavLink";

import React, { useEffect, useState } from "react";
import { Menu, SunIcon, X } from "lucide-react";
import { checkAndAddUser } from "@/app/server";
import { useTheme } from "../themeContext";

function NavBar() {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const { user } = useUser();

  const { theme, setTheme, themes } = useTheme();

  useEffect(() => {
    if (user && user.primaryEmailAddress?.emailAddress && user?.fullName) {
      checkAndAddUser(user.primaryEmailAddress.emailAddress, user.fullName);
    }
  }, [user]);
  return (
    <header className="bg-base-300 shadows">
      <div className="px-5 md:px-[10%] flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <LogoBrand />
        </div>
        <div className="hidden md:flex gap-4">
          <NavLinks />
        </div>
        <div className="flex items-center gap-2">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: "48px",
                  height: "48px",
                },
              },
            }}
          />
          <button
            className="md:hidden btn btn-sm btn-soft btn-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="form-control w-full max-w-xs  items-center gap-2 ml-5 hidden md:flex">
         <SunIcon className="w-7 h-7" />
            <fieldset className="fieldset flex">

              <select
                className="select select-bordered"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                {themes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
 
            </fieldset>
      
          </div>
        </div>
      </div>
      {isOpen && (
        <div className=" md:hidden flex flex-col bg-base-300 shadow-inner py-4 p-4 space-y-2 ">
          <NavLinks />
        </div>
      )}
    </header>
  );
}

export default NavBar;
