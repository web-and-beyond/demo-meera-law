import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meera Law | Law, with a human point of view",
  description: "A fictional modern law firm demo focused on clear, human legal guidance.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
