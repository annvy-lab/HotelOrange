import type { Metadata } from "next";
import { Urbanist, Abhaya_Libre } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/hooks/useAuth";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const abhayaLibre = Abhaya_Libre({
  weight: "800",
  subsets: ["latin"],
  variable: "--font-abhaya",
});

export const metadata: Metadata = {
  title: "Hotel Laranja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${urbanist.variable} ${abhayaLibre.variable}`}
    >
      <body className="font-sans antialiased">
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              borderRadius: "9999px",
            },
          }}
        />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
