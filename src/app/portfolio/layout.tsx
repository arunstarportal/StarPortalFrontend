"use client";
import { BarChart2, Clock, Wallet } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function ProtocolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className="protocols-layout py-6 text-gray-300">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {path.split("/")[2] === "summary"
                ? "Portfolio Overview"
                : path.split("/")[2] === "history"
                  ? "Transaction History"
                  : "Portfolio Analysis"}
            </h1>
            <p className="text-gray-400">
              Track your crypto assets across multiple chains
            </p>
          </div>
          <div className="flex gap-4">
            {[
              { icon: <Wallet className="w-5 h-5" />, label: "Summary" },
              { icon: <BarChart2 className="w-5 h-5" />, label: "Analytics" },
              { icon: <Clock className="w-5 h-5" />, label: "History" },
            ].map((item, index) => (
              <button
                key={index}
                onClick={() =>
                  router.push(`/portfolio/${item.label.toLowerCase()}`)
                }
                className={`${path.split("/")[2] === item.label.toLowerCase() ? "bg-purple-500/10 text-purple-400" : "bg-[#1a1a1a] hover:bg-[#222] hover:scale-105"} flex items-center gap-2 px-4 py-2 rounded-lg  transition-colors  duration-300`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
