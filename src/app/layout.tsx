import type { Metadata } from "next";
import { AppProvider } from "../context/AppContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "FarmerLink | Connecting Farmers & Corporate Companies",
  description: "Connecting Farmers and Corporate Companies for Smarter Agriculture. A secure, premium, and multilingual social networking platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;405;500;600;700&family=Poppins:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-inter bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
