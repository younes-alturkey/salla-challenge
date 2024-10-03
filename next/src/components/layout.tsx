import DefineCustomElements from "@/components/define-custom-elements"
import "react-resizable/css/styles.css"

export default function Layout(props: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={props.className}>
      {props.children}
      <div className="fixed bottom-4 right-4 text-center flex flex-col justify-center items-end">
        <p className="text-xl text-purple-700 animate-pulse text-center w-[450px]">
          This is a NextJS website.
        </p>
        <p className="text-base text-purple-800 opacity-70 w-[450px]">
          This is a server-side rendered page initially, with client-side
          rendering for the web-components. Initial data is fetched server-side
          and subsequent data is fetched client-side.
        </p>
      </div>
      <DefineCustomElements />
    </div>
  )
}
