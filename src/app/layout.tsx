import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { CommandPalette } from "@/components/command-palette";
import { getAllPosts } from "@/lib/mdx";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/data/site";

export const metadata: Metadata = {
  ...buildMetadata({ title: site.name, description: site.description, path: "/" }),
  metadataBase: new URL(site.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getAllPosts();

  return (
    <html lang="en" className="dark h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CommandPalette posts={posts} />
        </ThemeProvider>
      </body>
    </html>
  );
}
