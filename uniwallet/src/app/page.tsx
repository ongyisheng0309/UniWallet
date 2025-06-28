import Component from "../../crypto-app"
import WebsiteLayout from "../components/website-layout"

export default function Page() {
  return (
    <WebsiteLayout currentPage={1} totalPages={5}>
      <Component />
    </WebsiteLayout>
  )
}
