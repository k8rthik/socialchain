import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Footer from "@/components/Footer";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Your Profile",
  description: "Connecting you with your community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <div>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
