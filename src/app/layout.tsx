"use client";
import "./globals.css";
import ReactProvider from "@/components/ReactProvider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body

      >
        <ReactProvider>{children}</ReactProvider>
      </body>
    </html>
  );
}
