import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      data: [
        {
          id: "001",
          label: "JBL QuietComfort 45 wireless bluetooth headphones",
          thumbnail:
            "https://cdn.salla.sa/oRmZv/bi7pdht4SRGPLmziP5fDcuFyuDOwz4FypJ5svKxU.jpg",
          qty: 1,
          price: {
            currency: "SAR",
            amount: 1500,
          },
        },
        {
          id: "002",
          label: "JBL Active Noise Cancelling Headphones",
          thumbnail:
            "https://cdn.salla.sa/oRmZv/9wgo7gyYLL6WsYwugU1zZEn3nypaI93MDCPiPhI5.png",
          qty: 1,
          price: {
            currency: "SAR",
            amount: 750,
          },
        },
        {
          id: "003",
          label: "JBL AirPods Max - Sky Blue",
          thumbnail:
            "https://cdn.salla.sa/oRmZv/ntqWnEYORNd9I37LmsBNb7A0DnSx3kTd9Sa64lKZ.jpg",
          qty: 1,
          price: {
            currency: "SAR",
            amount: 1650,
          },
        },
      ],
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  )
}
