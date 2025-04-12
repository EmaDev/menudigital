import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/*const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});*/

export const metadata: Metadata = {
  title: "SanGusto",
  description: "Menu digital San Gusto tienda de comidas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      //className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      {/*<footer className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="border-t border-slate-900/5 py-6">
          <p className="mt-5 text-center text-sm leading-6 text-slate-500">© {new Date().getFullYear()}. Todos los derechos reservados.</p>
          <div className="mt-6 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-slate-700"><a
            href="/privacy-policy">Power by</a>
            <div className="h-4 w-px bg-slate-500/20"></div><a href="/changelog">EmaDev</a>
          </div>
        </div>
      </footer>*/}
    </html>
  );
}
