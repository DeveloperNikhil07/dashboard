"use client";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css"
import "../../public/assets/css/style.css";
import "../../public/assets/css/responsive.css";
import { usePathname } from 'next/navigation';
import { useEffect, } from 'react';

import Header from "./component/Header";
import AsideBar from "./component/AsideBar";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const noHeaderFooterPages = ['/', '/signup'];
  const hideHeaderFooter = noHeaderFooterPages.includes(pathname);

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
  return (
    <html lang="en">
      <body>
        {!hideHeaderFooter && <Header />}
        {children}
        {!hideHeaderFooter && <AsideBar />}
      </body>
    </html>
  );
}
