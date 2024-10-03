import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      data: [
        {
          id: "001",
          name: "freemusic",
          label: "FREEMUSIC",
          discount: {
            type: "percentage",
            amount: "15",
          },
        },
        {
          id: "002",
          name: "summerdeal",
          label: "SUMMERDEAL",
          discount: {
            type: "percentage",
            amount: "20",
          },
        },
        {
          id: "003",
          name: "newyear",
          label: "NEWYEAR2024",
          discount: {
            type: "flat",
            amount: "100",
          },
        },
        {
          id: "004",
          name: "freedelivery",
          label: "FREEDELIVERY",
          discount: {
            type: "flat",
            amount: "50",
          },
        },
        {
          id: "005",
          name: "backtoschool",
          label: "BACKTOSCHOOL",
          discount: {
            type: "percentage",
            amount: "15",
          },
        },
        {
          id: "006",
          name: "springfest",
          label: "SPRINGFEST",
          discount: {
            type: "percentage",
            amount: "25",
          },
        },
      ],
    },
    { status: 200 }
  )
}
