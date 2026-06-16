import Header from "@/components/sections/header";
import "./globals.css";
import { I18nProvider } from "@/components/i18n-provider";
import Footer from "@/components/sections/footer";
export const metadata = {
  title: "DAR AI - Brand Builder",
  description: "Build a powerful brand presence instantly with AI.",
  icons: {
    icon: "/images/favicon.png",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <Header />
          {children}
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
