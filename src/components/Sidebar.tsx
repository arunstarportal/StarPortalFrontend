"use client";
import { useState } from "react";

const SidebarData = [
  { label: "Ethereum", icon: "eth" },
  { label: "Tron", icon: "tron" },
  { label: "Solana", icon: "solona" },
  { label: "Base", icon: "base" },
  { label: "Arbitrum", icon: "arbitrum" },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-gradient-to-br from-[#282828] via-[#000] to-[#000] h-screen py-5 transition-all duration-500 relative border-r-[0.5px] border-gray-700/50 shadow-2xl flex flex-col justify-between z-50`}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-5 right-[-0.75rem] text-white border border-gray-600 flex items-center justify-center rounded-full w-7 h-7 bg-gray-800/60 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
      >
        {isCollapsed ? (
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "1.3rem" }}
          >
            chevron_right
          </span>
        ) : (
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "1.3rem" }}
          >
            chevron_left
          </span>
        )}
      </button>

      {/* Logo */}
      <div className="text-white border-b-[0.5px] border-gray-700/70 px-5 pb-5 flex items-center justify-center">
        <img
          src="/logo.png"
          alt="Logo"
          className={`h-auto transition-all duration-300 ${
            isCollapsed ? "w-10" : "w-3/4"
          }`}
        />
      </div>

      {/* Chains Section */}
      <div
        className={`text-gray-300 py-7 px-5 flex items-center gap-3 transition-all duration-300 ${
          isCollapsed ? "justify-center" : "justify-center"
        }`}
      >
        {!isCollapsed && <p className="font-semibold text-base">CHAINS </p>}
        <img src="/svgs/chain.svg" alt="Chains Icon" className="w-4 h-4" />
      </div>

      {/* Navigation Links */}
      <nav className="px-5">
        <ul className="space-y-4">
          {SidebarData.map((chain, index) => (
            <li
              key={index}
              className="flex items-center gap-4 p-3 bg-gradient-to-r from-transparent to-transparent hover:from-[#87848482] hover:to-[#353535] rounded-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <img
                src={`/svgs/${chain.icon}.svg`}
                alt={`${chain.label} Icon`}
                className={`w-6 h-6 transition-all duration-300 ${
                  isCollapsed ? "m-auto" : ""
                }`}
              />
              {!isCollapsed && (
                <span className="text-gray-300 text-base font-medium">
                  {chain.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section - Additional Links */}
      <div className="mt-auto px-5">
        <div className="text-gray-400 text-sm pb-3 border-t-[0.5px] border-gray-700/50 pt-5">
          {!isCollapsed && (
            <p className="text-center">
              Powered by{" "}
              <span className="text-gray-200 font-semibold">Starportal.co</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
