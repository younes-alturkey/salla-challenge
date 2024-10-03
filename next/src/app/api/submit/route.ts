import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json(
    {
      success: true,
      data: { title: "Payment Confirmed", subtitle: "Thank you for shopping" },
    },
    { status: 200 }
  )
}
