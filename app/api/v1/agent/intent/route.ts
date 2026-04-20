import { NextRequest, NextResponse } from "next/server";
import { PublicKey } from "@solana/web3.js";
import {
  PAYMENTS_CLUSTER,
  PAYMENTS_ENDPOINTS,
  getPaymentsApiUrl,
  getPaymentsTimeoutSignal,
} from "@/lib/payments";

/**
 * NULL.PROTOCOL: Headless Agent Intent API
 * This endpoint allows autonomous AI Agents to request programmatic access to Dark Pool capabilities without frontend dependency.
 * An agent simply submits their requested product intent, and the backend handles constructing the TEE payload with obfuscated routing.
 */

interface AgentIntentPayload {
  agent_pubkey: string;
  target_resource: "compute" | "quantum_model" | "privacy_guard";
  amount: number; // in minor units
}

const RESOURCE_ROUTING_MAP = {
  compute: "EHN1bbAL4o5m15TqS4h1HPRwR2oY9p6rDMBP9vtoU93F",
  quantum_model: "EHN1bbAL4o5m15TqS4h1HPRwR2oY9p6rDMBP9vtoU93F",
  privacy_guard: "EHN1bbAL4o5m15TqS4h1HPRwR2oY9p6rDMBP9vtoU93F",
};

// Default USDC SPL Mint (Mainnet/Devnet agnostic for demo)
const DEFAULT_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"; 

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AgentIntentPayload;
    const { agent_pubkey, target_resource, amount } = body;

    if (!agent_pubkey || !target_resource || !amount) {
      return NextResponse.json(
        { error: "Protocol Error: Missing mandatory agent intent parameters." },
        { status: 400 }
      );
    }

    try {
      new PublicKey(agent_pubkey);
    } catch {
      return NextResponse.json(
        { error: "Protocol Error: Invalid Solana public key." },
        { status: 400 }
      );
    }

    const destinationNode = RESOURCE_ROUTING_MAP[target_resource];
    if (!destinationNode) {
      return NextResponse.json(
        { error: "Protocol Error: Target resource not available in dark pool." },
        { status: 404 }
      );
    }

    // Agentic automation: System arbitrarily applies obfuscation delays (e.g. 5m to 20m) 
    // and batch splitting based on dark pool volume dynamically.
    const systemMinDelayMs = String(5 * 60 * 1000); 
    const systemMaxDelayMs = String(20 * 60 * 1000);
    const systemSplitChunks = Math.floor(Math.random() * 3) + 2; // Split into 2-4 chunks

    // Forward the intent to the underlying TEE architecture via our proxy logic
    const upstreamRes = await fetch(getPaymentsApiUrl(PAYMENTS_ENDPOINTS.splTransfer), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: agent_pubkey,
        to: destinationNode,
        ...(PAYMENTS_CLUSTER ? { cluster: PAYMENTS_CLUSTER } : {}),
        mint: DEFAULT_MINT,
        amount: amount,
        visibility: "private",
        fromBalance: "base",
        toBalance: "base",
        initIfMissing: true,
        initAtasIfMissing: true,
        initVaultIfMissing: false,
        memo: `[NULL_PROTOCOL] Auto-routed: ${target_resource}`,
        minDelayMs: systemMinDelayMs,
        maxDelayMs: systemMaxDelayMs,
        split: systemSplitChunks,
      }),
      signal: getPaymentsTimeoutSignal(),
      cache: "no-store",
    });

    const responseBody = await upstreamRes.json().catch(() => null);

    if (!upstreamRes.ok) {
      return NextResponse.json(
        { error: "TEE Routing Error: Unable to construct private tunnel execution.", details: responseBody },
        { status: upstreamRes.status }
      );
    }

    // The backend successfully constructed the intent. The AI Agent now simply extracts the Base64 transaction and signs it.
    return NextResponse.json({
      status: "intent_constructed",
      tunnel_assigned: true,
      obfuscation_metrics: {
        splits: systemSplitChunks,
        min_delay_ms: systemMinDelayMs,
        max_delay_ms: systemMaxDelayMs
      },
      unsigned_transaction: responseBody
    });

  } catch (error) {
    console.error("Null Protocol API Intent error:", error);
    return NextResponse.json(
      { error: "Internal node error." },
      { status: 500 }
    );
  }
}
