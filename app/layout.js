import "./globals.css";
import { I18nProvider } from "@/components/i18n-provider";

export const metadata = {
  title: "DAR - Brand Builder",
  description: "Build a powerful brand presence instantly with AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
