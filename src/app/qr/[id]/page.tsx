import CenteredLayout from "@/components/CenteredLayout"
import QRCode from "react-qr-code"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id


  const isLocal = process.env.NODE_ENV === "development";
  const baseUrl = isLocal ? "http://localhost:3000" : "https://socialchain-readthedocumentations-projects.vercel.app";


  const taskUrl = `${baseUrl}/tasks/${id}`;
  return (<CenteredLayout>
    <QRCode value={taskUrl} />
  </CenteredLayout>

  )
}
