import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      data: [
        {
          id: "002",
          name: "dhl",
          label: "DHL",
          logo: "https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg",
          fees: {
            currency: "SAR",
            amount: 0,
          },
        },
        {
          id: "003",
          name: "fedex",
          label: "FedEx",
          logo: "https://www.fedex.com/content/dam/fedex-com/logos/logo.png",
          fees: {
            currency: "SAR",
            amount: 15,
          },
        },
        {
          id: "001",
          name: "aramex",
          label: "Aramex",
          logo: "https://www.aramex.com/Sitefinity/WebsiteTemplates/aramex/App_Themes/aramex/Images/Aramex%20logo%20English.webp",
          fees: {
            currency: "SAR",
            amount: 25,
          },
        },
      ],
    },
    { status: 200 }
  )
}
