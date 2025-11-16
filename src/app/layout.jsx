import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import PublicLayout from "@/components/PublicLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "WETOO MEDIA - IAS | UPSC, BPSC, RCA Preparation",
  description: "Your trusted digital mentor for UPSC, SSC & competitive exam success - empowering aspirants through free guidance, resources, and inspiration.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
        }}
      >
        <PublicLayout>{children}</PublicLayout>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
