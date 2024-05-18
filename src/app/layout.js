import { Inter } from "next/font/google";
import "./globals.css";
import CustomNavbar from "@/components/Navbar";
import { Toaster } from "sonner";
import { AuthProvider } from "./Providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CustomNavbar />
          <Toaster />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
