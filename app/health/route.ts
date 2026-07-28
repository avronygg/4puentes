import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** GET /health — sonda de vida. Contrato de módulo Main Brain. */
export function GET() {
  return NextResponse.json(
    { status: "ok", uptime: process.uptime() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
