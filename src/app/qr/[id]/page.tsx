import CenteredLayout from "@/components/CenteredLayout"
import QRCode from "react-qr-code"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return (<CenteredLayout>

    <QRCode value={id} />
  </CenteredLayout>

  )
}
