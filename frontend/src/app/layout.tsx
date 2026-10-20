import React from "react";

export const metadata = {
  title: "AI Travel Concierge",
  description: "AI-powered personalized travel concierge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
