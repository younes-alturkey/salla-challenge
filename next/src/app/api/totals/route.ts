import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      data: [
        {
          name: "cart_total",
          label: "Cart Total",
          currency: "SAR",
          amount: 3900,
        },
        {
          name: "discount",
          label: "Discount",
          currency: "SAR",
          amount: 0,
        },
        {
          name: "shipping_fees",
          label: "Shipping Fees",
          currency: "SAR",
          amount: 0,
        },
        {
          name: "total",
          label: "Total",
          currency: "SAR",
          amount: 3900,
        },
      ],
    },
    { status: 200 }
  )
}
