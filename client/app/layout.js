import { Inter } from "next/font/google";
import AuthProvider from "./context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "codookola.pl",
  description: "Aplikacja z którą odkryjesz wszystkie wspaniałe wydarzenia w Twojej okolicy!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl" suppressHydrationWarning={true}>
      <AuthProvider>
        <body className={inter.className}>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
