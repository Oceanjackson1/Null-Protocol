import { NextRequest, NextResponse } from "next/server";

const HACKATHON_MOCK_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Encoding, Accept-Encoding",
};

export async function OPTIONS() {
  return new Response(null, { headers: HACKATHON_MOCK_HEADERS });
}

export async function GET(request: NextRequest) {
  // Return standard Solana Action GET response
  return NextResponse.json(
    {
      icon: "https://docs.magicblock.gg/mintlify-assets/_mintlify/favicons/magicblock-42/U_0PfsrxUNdGUMiY/_generated/favicon/android-chrome-512x512.png", // Demo placeholder
      title: "NULL.PROTOCOL Stealth Compute",
      description: "Acquire 25 USDC worth of untraceable compute credits for your AI Agents. Transactions are routed via MagicBlock Ephemeral Rollups to prevent alpha leakage.",
      label: "Buy Stealth Compute",
      links: {
        actions: [
          {
            label: "Buy Compute (25 USDC)",
            href: "/api/actions/stealth-buy?amount=25",
          },
        ],
      },
    },
    { headers: HACKATHON_MOCK_HEADERS }
  );
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    {
      transaction: "BASE64_UNSIGNED_TRANSACTION_MOCK",
      message: "Private intent routed through NULL.PROTOCOL.",
    },
    { headers: HACKATHON_MOCK_HEADERS }
  );
}
