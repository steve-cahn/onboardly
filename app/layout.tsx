import { Toaster } from "react-hot-toast";
import Link from "next/link";
import "./globals.css";
import "./styles/layout.css";
import "./styles/forms.css";
import "./styles/animations.css";


export const metadata = {
  title: "OnBoardly",
  description: "Customizable onboarding wizard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <nav>
            <Link href="/">Onboarding</Link>
            <Link href="/admin">Admin</Link>
            <Link href="/data">Data</Link>
          </nav>
        </header>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#14151a",
              color: "#f5f7fa",
              border: "1px solid #23252e",
            },
            success: { iconTheme: { primary: "#5b9cff", secondary: "#0b0c10" } },
          }}
        />

        <main className="container">{children}</main>
      </body>
    </html>
  );
}
