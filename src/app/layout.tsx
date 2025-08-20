import type { Metadata } from "next";
import "./globals.css";
import connectToDbIfNotConnected from "@/utils/connectToDbIfNotConnected";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Ma Boutique",
  description: "Une boutique en ligne moderne et élégante",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectToDbIfNotConnected();

  return (
    <html lang="fr">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-900 antialiased">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Header />
          <main className="mt-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
