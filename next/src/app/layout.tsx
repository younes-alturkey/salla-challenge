import "@/app/globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Salla Web Components with NextJS",
  description:
    "Senior Front-End developers who are willing to join Salla development.",
}

export default function RootLayout(
  props: Readonly<{
    children: React.ReactNode
  }>
) {
  return (
    <html>
      <body>{props.children}</body>
    </html>
  )
}
