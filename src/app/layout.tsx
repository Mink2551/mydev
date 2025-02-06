import type { Metadata } from "next";
import { Mali } from "next/font/google";
import { AuthProvider } from "./Provinders";
import "./globals.css";

const mali = Mali({
  variable: "--font-mali",
  subsets: ["latin", "thai"],
  weight: ["300", "500", "700"],
});

export const metadata: Metadata = {
  title: "MyDev",
  description: "My Developer Docs Project",
  icons: {
    icon: '/RoundLogo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mali.variable} bg-palette1 antialiased`}
      > 
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
