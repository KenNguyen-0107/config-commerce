import { Toaster } from "@/components/ui/toaster"
import dynamic from "next/dynamic"
import { Lora } from "next/font/google"
import localFont from "next/font/local"
import NextTopLoader from "nextjs-toploader"
import { ToastContainer } from "react-toastify"
import "./globals.css"
//import { useInitializeCookies } from "@/app/utils/session"
import { ClientCookieInitializer } from "@/components/shared/clientCookieInitializer"

const Header = dynamic(() => import("@/components/layout/header"), {
  ssr: true,
})
const Footer = dynamic(() => import("@/components/layout/footer"), {
  ssr: true,
})
export const metadata = {
  title: "Jacksons Fencing",
  description: "High-quality fencing solutions",
}
const lora = Lora({
  variable: "--font-lora",
  weight: "500",
  preload: false,
  display: "swap",
  subsets: ["latin"],
})

const frutigerBold = localFont({
  src: "../../public/fonts/new-frutiger-bold.woff2",
  variable: "--font-frutiger-bold",
  weight: "400",
  preload: true,
  display: "swap",
})

const helvetical = localFont({
  src: "../../public/fonts/HelveticaNeueLight.woff2",
  variable: "--font-helvetical",
  weight: "400",
  preload: false,
  display: "swap",
})

const helveticalBold = localFont({
  src: "../../public/fonts/HelveticaNeueMedium.woff2",
  variable: "--font-helvetical-bold",
  weight: "400",
  preload: false,
  display: "swap",
})

// Initialize cookies - properly await the function

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  //useInitializeCookies()
  return (
    <html lang="en">
      <body
        className={`scroll-smooth ${frutigerBold.variable} ${helvetical.variable} ${lora.variable} ${helveticalBold.variable} font-frutiger-bold antialiased`}
      >
        {/* Add the ClientCookieInitializer here */}
        <ClientCookieInitializer />
        <NextTopLoader color="#e2b010" />
        <Header />
        {children}
        <Toaster />
        <Footer />
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  )
}
