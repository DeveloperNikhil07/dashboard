"use client";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css"
import "../../public/assets/css/style.css";
import "../../public/assets/css/responsive.css";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from "./component/Header";
import AsideBar from "./component/AsideBar";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const noHeaderFooterPages = ['/', '/signup', '/login'];
  const hideHeaderFooter = noHeaderFooterPages.includes(pathname);

  const authPages = ["/","/login", "/signup", "/forget"];
  const isAuthPage = authPages.includes(pathname);

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  // Asidebar show
  const [showAsidebar, setShowAsidebar] = useState(false)
  const AsidebarToggleHandle = () => {
    setTimeout(() => {
      setShowAsidebar((prev) => !prev)
    }, 100);
  }




  return (
    <html lang="en">
      <body>
        <section className={`home-controller ${isAuthPage ? "home-control-panel" : ""}`}>
          <div className={`home-asidebar d-flex ${showAsidebar ? "show-asidebar" : ""}`}>
            {!hideHeaderFooter && <AsideBar showAsidebar={showAsidebar} AsidebarToggleHandle={AsidebarToggleHandle} />}
            <div className="home-header w-100">
              {!hideHeaderFooter && <Header AsidebarToggleHandle={AsidebarToggleHandle} />}
              <div className="child-render">
                {children}
              </div>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}

