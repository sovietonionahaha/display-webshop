import "./globals.css";

import { Inter } from "next/font/google"
import clsx from "clsx";
import { siteConfig } from "../config/site";
import { ToastContainer } from "react-toastify";
import { ModalProvider } from "@/components/modal/ModalProvider";

export const metadata = {
  title: siteConfig.company.title,
  description: "",
}

const inter = Inter({
})

export default function RootLayout({ children }) {

  return (
    <html
      lang="hu"
      className={clsx(`h-full antialiased`, inter.className)}
    >
      <body
        className="min-h-full flex flex-col"
        style={
          {
            "--color-primary": siteConfig?.theme?.primary,
            "--color-secondary": siteConfig?.theme?.secondary,
            "--color-third": siteConfig?.theme?.third,
            "--navbar-bg": siteConfig?.navbar?.backgroundColor,
            "--navbar-text": siteConfig?.navbar?.textColor,
            "--section-bg": siteConfig?.sectionbreak?.backgroundColor,
            "--section-text": siteConfig?.sectionbreak?.textColor,
            backgroundColor: siteConfig?.theme?.backgroundColor
          }
        }
      >
        <ToastContainer />
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
