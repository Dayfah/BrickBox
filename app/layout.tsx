import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "BrickBox",
  description: "A modern vault for comic collectors with merch and BBX Token.",
  icons: [{ rel: "icon", url: process.env.BBX_ICON || "/favicon.ico" }],
  other: {
    "bbx-metadata": process.env.BBX_METADATA || "",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-bbxDark text-bbxCream">
        <NavBar />
        <main className="flex-1 p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
