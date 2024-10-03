"use client";
import React from "react";
import { FaAngleDown } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { menuItems } from "./data/menuItems";
import { useAppContext } from "@/context";
import { FaBuildingUser } from "react-icons/fa6";
import { PiTicketFill, PiUsersThreeLight } from "react-icons/pi";
import { TfiStatsUp } from "react-icons/tfi";
import { HiOutlineUsers } from "react-icons/hi2";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const { userState } = useAppContext(); // Obtener el estado del usuario
  const pathname = usePathname();

  // if (pathname.includes("/cinemark")) return null;

  return (
    <div className="flex h-screen flex-col justify-between w-[30%]">
      <div className="pl-4 py-6">
        <span className="flex h-10 items-center rounded-lg text-black text-lg">
          Hola {userState.role}
        </span>

        <ul className="mt-6 space-y-1">
          {/* Mostrar secciones diferentes para SUPER_ADMIN y OPERATOR */}
          {userState.role === "SUPER_ADMIN" && (
            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-black hover:bg-gray-100 hover:text-black">
                  <div className="flex space-x-3">
                    <TfiStatsUp className="text-2xl" />
                    <span className="flex items-center text-sm font-medium">
                      Tu trabajo
                    </span>
                  </div>
                  <FaAngleDown className="shrink-0 transition duration-300 group-open:-rotate-180" />
                </summary>
                <ul className="mt-2 space-y-1 px-4">
                  {/* Subitems para la sección "Tu trabajo" del SUPER_ADMIN */}
                  <MenuItem
                    href="/companies-dashboard"
                    icon={FaBuildingUser}
                    label="Dashboard EMPRESAS"
                    isActive={pathname === "/companies-dashboard"}
                  />
                  <MenuItem
                    href="/users-dashboard"
                    icon={PiUsersThreeLight}
                    label="Dashboard USUARIOS"
                    isActive={pathname === "/users-dashboard"}
                  />
                  <MenuItem
                    href="/interactions-dashboard"
                    icon={PiTicketFill}
                    label="Dashboard INTERACCIONES"
                    isActive={pathname === "/interactions-dashboard"}
                  />
                </ul>
              </details>
            </li>
          )}

          {userState.role === "OPERATOR" && (
            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-black hover:bg-gray-100 hover:text-black">
                  <div className="flex space-x-3">
                    <TfiStatsUp className="text-2xl" />
                    <span className="flex items-center text-sm font-medium">
                      Tu trabajo
                    </span>
                  </div>
                  <FaAngleDown className="shrink-0 transition duration-300 group-open:-rotate-180" />
                </summary>
                <ul className="mt-2 space-y-1 px-4">
                  {/* Subitem para la sección "Validar identidad de cliente" del OPERATOR */}
                  <MenuItem
                    href="/validate-client-identity"
                    icon={HiOutlineUsers}
                    label="Validar identidad de cliente"
                    isActive={pathname === "/validate-client-identity"}
                  />
                </ul>
              </details>
            </li>
          )}

          {/* Mostrar los demás elementos del menú */}
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.subItems.length > 0 ? (
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-black hover:bg-gray-100 hover:text-black">
                    <div className="flex space-x-3">
                      <item.icon className="text-2xl" />
                      <span className="flex items-center text-sm font-medium">
                        {item.label}
                      </span>
                    </div>
                    <FaAngleDown className="shrink-0 transition duration-300 group-open:-rotate-180" />
                  </summary>
                  <ul className="mt-2 space-y-1 px-4">
                    {item.subItems.map((subItem, subIndex) => (
                      <MenuItem
                        key={subIndex}
                        {...subItem}
                        isActive={pathname === subItem.href}
                      />
                    ))}
                  </ul>
                </details>
              ) : (
                <MenuItem {...item} isActive={pathname === item.href} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
