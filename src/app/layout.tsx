import { Toaster } from "@/components/ui/toaster";
import dynamic from "next/dynamic";
import { Lora, Poppins } from "next/font/google";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { preloadOrderHistory } from "@/utils/orderUtils";
import { preloadAllShipping } from "@/utils/myAccountUtils";
//import { useInitializeCookies } from "@/app/utils/session"
import { ClientCookieInitializer } from "@/components/shared/clientCookieInitializer";
import SiteSettingsInitializer from "@/components/shared/siteSettingsInitializer";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import CustomHead from "@/components/common/CustomHead";
import ScrollToTop from "@/components/common/ScrollToTop";
import { DefaultPageSeo } from "@packages/optimizely-cms-nextjs/components/page-seo";
const Header = dynamic(() => import("@/components/layout/header"), {
	ssr: true,
});
const Footer = dynamic(() => import("@/components/layout/footer"), {
	ssr: true,
});

// export const metadata = {
// 	title: "Jacksons Fencing",
// 	description: "High-quality fencing solutions",
// };

const lora = Lora({
	variable: "--font-lora",
	weight: "500",
	preload: false,
	display: "swap",
	subsets: ["latin"],
});

const poppins = Poppins({
	variable: "--font-poppins",
	weight: "400",
	preload: false,
	display: "swap",
	subsets: ["latin"],
});

const frutigerBold = localFont({
	src: "../../public/fonts/new-frutiger-bold.woff2",
	variable: "--font-frutiger-bold",
	weight: "400",
	preload: true,
	display: "swap",
});

const helvetical = localFont({
	src: "../../public/fonts/HelveticaNeueLight.woff2",
	variable: "--font-helvetical",
	weight: "400",
	preload: false,
	display: "swap",
});

const helveticalBold = localFont({
	src: "../../public/fonts/HelveticaNeueMedium.woff2",
	variable: "--font-helvetical-bold",
	weight: "400",
	preload: false,
	display: "swap",
});

// Initialize cookies - properly await the function

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	preloadOrderHistory();
	preloadAllShipping();
	return (
		<html className="dark" lang="en" data-timestamp={new Date().toISOString()}>
			<head>
				<CustomHead />
			</head>
			<body
				className={`scroll-smooth ${poppins.variable} ${frutigerBold.variable} ${helvetical.variable} ${lora.variable} ${helveticalBold.variable} font-frutiger-bold antialiased`}
			>
				<ClientCookieInitializer />
				<SiteSettingsInitializer />
				<ErrorBoundary>
					<Header />
					{children}
					<Toaster />
					<Footer />
					<ScrollToTop />
				</ErrorBoundary>
				<ToastContainer position="bottom-right" />
			</body>
		</html>
	);
}
