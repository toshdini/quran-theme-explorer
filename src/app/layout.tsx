import "./globals.css";

export const metadata = {
  title: "Quranic Theme Explorer",
  description: "Discover the Quran through its profound themes and messages",
  keywords: "Quran, Islamic, Themes, Explorer, Arabic, Translation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="no">
      <head>
        <meta name="google" content="notranslate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
