"use client";

import { useEffect, useState } from "react";

export function LiveTelemetry() {
  const [nodes, setNodes] = useState(42);
  const [routed, setRouted] = useState(14029);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live fluctuating network load
      setNodes((prev) => prev + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3)));
      if (Math.random() > 0.3) {
        setRouted((prev) => prev + Math.floor(Math.random() * 5) + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-6 left-6 2xl:left-12 flex flex-col gap-1 text-[10px] md:text-xs font-mono text-white/40 tracking-widest z-50 pointer-events-none">
      <div className="flex items-center gap-2">
        <span className="text-[#d1fb00] animate-pulse">●</span>
        <span>SYS.TELEMETRY_LINK_ESTABLISHED</span>
      </div>
      <div className="flex items-center gap-4 mt-2">
        <span className="flex items-center gap-2">
          [SEC_NODES]: <span className="text-white">{Math.max(12, nodes)}</span>
        </span>
        <span className="flex items-center gap-2">
          [TX_ROUTED_24H]: <span className="text-white">{routed.toLocaleString()}</span>
        </span>
        <span className="hidden sm:inline flex items-center gap-2">
          [ZK_ORACLE]: <span className="text-[#d1fb00]">NOMINAL</span>
        </span>
      </div>
    </div>
  );
}
