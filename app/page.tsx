import { Suspense } from "react";
import { Header } from "@/components/one/header";
import { TradeHub } from "@/components/one/trade-hub";
import { Plus } from "lucide-react";

export default async function Home(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const currentMemo = typeof searchParams.memo === 'string' ? searchParams.memo : '';
  const products = [
    {
      name: "Quantum Trading Model V4",
      desc: "Agentic automated trading strategy equipped with zero-knowledge MEV protection.",
      price: "150 USDC",
      id: "buy-quantum",
    },
    {
      name: "Stealth Compute Credits",
      desc: "Untraceable compute hours inside TEE nodes for your AI agents.",
      price: "25 USDC",
      id: "buy-compute",
    },
    {
      name: "Privacy Guard Module",
      desc: "Anonymizes your wallet's on-chain footprint using MagicBlock ERs.",
      price: "50 USDC",
      id: "buy-privacy",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col relative overflow-hidden font-mono tracking-widest selection:bg-[#d1fb00] selection:text-black">
      
      {/* --- Cinematic Background Glow --- */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Dynamic bright neon line/sweep cutting across */}
        <div className="absolute top-[30%] left-[-20%] w-[150%] h-[2px] bg-[#d1fb00] shadow-[0_0_80px_20px_#d1fb00] transform -rotate-12 opacity-30" />
        <div className="absolute top-[40%] left-[20%] w-[600px] h-[600px] bg-[#d1fb00] rounded-full blur-[250px] opacity-[0.07] mix-blend-screen mix-blend-lighten" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-white rounded-full blur-[150px] opacity-[0.03] mix-blend-screen" />
        
        {/* Grid dots/lines like the tactical HUD */}
        <div className="absolute bottom-10 right-10 flex flex-col gap-1 opacity-40">
          <div className="flex gap-1"><div className="w-1 h-1 border border-white/50 rounded-full"/><div className="w-1 h-1 border border-white/50 rounded-full"/></div>
          <div className="flex gap-1"><div className="w-1 h-1 border border-white/50 rounded-full"/><div className="w-1 h-1 border border-white/50 rounded-full"/></div>
        </div>
        <div className="absolute top-10 right-10 text-white/30"><Plus className="w-3 h-3" /></div>
        <div className="absolute bottom-10 left-10 text-white/30"><Plus className="w-3 h-3" /></div>
        <div className="absolute top-32 left-32 text-white/30"><Plus className="w-3 h-3" /></div>
        
        {/* Bottom tactical measure ticks */}
        <div className="absolute bottom-8 left-32 flex gap-[2px] opacity-20">
          {Array.from({length: 40}).map((_, i) => (
            <div key={i} className={`w-[1px] bg-white ${i % 5 === 0 ? 'h-3' : 'h-1.5'}`} />
          ))}
        </div>
      </div>

      <Header />

      <main className="flex-1 relative z-10 w-full max-w-[1600px] mx-auto px-6 py-6 flex flex-col xl:flex-row gap-12 pt-12">
        
        {/* Left Area: Hero Branding & Storefront */}
        <div className="flex-1 flex flex-col items-center xl:items-start animate-in fade-in duration-1000">
          
          {/* Tactical Metadata Header */}
          <div className="w-full flex justify-between text-[10px] md:text-xs text-white/50 uppercase mb-20 tracking-[0.2em]">
            <div>
              <div className="mb-1 text-white/30">Project</div>
              <div className="text-white">NULL.PROTOCOL</div>
            </div>
            <div className="text-center">
              <div className="mb-1 text-white/30">Services</div>
              <div className="text-white">CONFIDENTIAL COMMERCE</div>
            </div>
            <div className="text-right">
              <div className="mb-1 text-white/30">Field</div>
              <div className="text-white">AI / TEE</div>
            </div>
          </div>

          {/* Huge Wide Typography */}
          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black uppercase text-center xl:text-left leading-none tracking-tighter w-full" style={{ fontStretch: 'expanded' }}>
            NULL
            <br />
            <span className="text-[#d1fb00]">PROTOCOL</span>
          </h1>

          {/* Glowing Geometric Logo */}
          <div className="my-16 relative flex items-center justify-center w-full xl:justify-start xl:pl-10">
            <svg width="240" height="240" viewBox="0 0 100 100" className="drop-shadow-[0_0_25px_rgba(209,251,0,0.8)] text-[#d1fb00]">
              <path 
                d="M 30,50 C 30,20 70,20 70,50 C 70,80 30,80 30,50 Z" 
                stroke="currentColor" 
                strokeWidth="10" 
                fill="none" 
                className="opacity-50"
              />
              <path 
                d="M 20,40 C 40,20 60,80 80,60" 
                stroke="currentColor" 
                strokeWidth="10" 
                fill="none" 
                strokeLinecap="round" 
              />
              <circle cx="20" cy="40" r="5" fill="currentColor" />
              <circle cx="80" cy="60" r="5" fill="currentColor" />
            </svg>
            
            {/* Overlay target box */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-[#d1fb00] opacity-50" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-[#d1fb00] opacity-50" />
          </div>

          {/* Product Terminal List */}
          <div className="w-full max-w-2xl mt-auto space-y-4">
            {products.map((product, i) => {
              const isActive = currentMemo === `Buy ${product.name}`;
              return (
                <div 
                  key={i} 
                  className={`group relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border transition-colors backdrop-blur-md ${
                    isActive 
                      ? 'border-[#d1fb00] bg-[#d1fb00]/5 shadow-[0_0_20px_rgba(209,251,0,0.15)]' 
                      : 'border-white/10 bg-black/40 hover:border-[#d1fb00]/50'
                  }`}
                >
                  <div>
                    <h3 className={`text-sm font-bold uppercase tracking-widest ${isActive ? 'text-[#d1fb00]' : 'text-white'}`}>{product.name}</h3>
                    <p className={`text-[10px] mt-1 uppercase max-w-sm ${isActive ? 'text-[#d1fb00]/70' : 'text-white/40'}`}>{product.desc}</p>
                  </div>
                  <div className="flex items-center gap-6 w-full sm:w-auto">
                    <span className="text-sm text-[#d1fb00] font-bold">
                      {product.price}
                    </span>
                    <a 
                      href={`/?tab=payment&rcv=EHN1bbAL4o5m15TqS4h1HPRwR2oY9p6rDMBP9vtoU93F&memo=Buy ${encodeURIComponent(product.name)}`}
                      className={`ml-auto sm:ml-0 text-xs px-4 py-2 uppercase font-bold transition-all ${
                        isActive ? 'bg-[#d1fb00] text-black hover:bg-white' : 'bg-white/10 text-white hover:bg-[#d1fb00] hover:text-black'
                      }`}
                    >
                      {isActive ? 'SELECTED' : 'INITIATE'}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Area: MagicBlock TradeHub Terminal */}
        <div className="w-full xl:w-[480px] shrink-0 mt-8 xl:mt-0 z-20">
          <div className="sticky top-24 p-1 rounded-none bg-black/60 backdrop-blur-2xl border border-white/5 shadow-2xl">
            {/* Terminal Top Bar */}
            <div className="flex justify-between items-center px-4 py-2 border-b border-white/5 bg-[#111]">
              <span className="text-[9px] uppercase tracking-widest text-[#d1fb00] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#d1fb00] rounded-full animate-pulse" />
                SECURE TEE TUNNEL
              </span>
              <span className="text-[9px] text-white/30">NODE.01</span>
            </div>

            <div className="p-4">
              <Suspense fallback={
                <div className="h-[400px] w-full flex flex-col justify-center items-center bg-[#050505] border border-white/5 font-mono">
                  <div className="text-[#d1fb00] animate-pulse mb-3 opacity-80 flex flex-col items-center">
                    <svg width="40" height="40" viewBox="0 0 100 100" className="mb-4">
                      <path d="M 30,50 C 30,20 70,20 70,50 C 70,80 30,80 30,50 Z" stroke="#d1fb00" strokeWidth="12" fill="none" opacity="0.5"/>
                      <path d="M 20,40 C 40,20 60,80 80,60" stroke="#d1fb00" strokeWidth="12" fill="none" strokeLinecap="round"/>
                    </svg>
                    <span className="tracking-widest text-xs uppercase">&gt; Establishing Secure TEE Tunnel_</span>
                  </div>
                  <div className="w-1/2 h-0.5 bg-white/10 mt-2 overflow-hidden relative">
                    <div className="absolute inset-0 bg-[#d1fb00] animate-[shimmer_1.5s_infinite]" style={{ clipPath: 'polygon(0 0, 30% 0, 50% 100%, 0 100%)' }} />
                  </div>
                </div>
              }>
                <TradeHub />
              </Suspense>
            </div>
            
            {/* Terminal Bottom Grid */}
            <div className="h-4 border-t border-white/5 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px]" />
          </div>
        </div>

      </main>
    </div>
  );
}
