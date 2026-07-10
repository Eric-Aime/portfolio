import "./globals.css";

export const metadata = {
  title: "Fidison Jean Eric Aimé — Portfolio",
  description:
    "Développeur Full-Stack passionné par le web, le mobile et les systèmes informatiques.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
