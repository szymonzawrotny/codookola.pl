import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "cosiedzieje.pl",
  description: "Aplikacja z którą odkryjesz wszystkie wspaniałe wydarzenia w Twojej okolicy!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl" suppressHydrationWarning={true}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
