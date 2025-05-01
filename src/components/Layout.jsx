import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import "./Layout.scss"

export default function LayoutRoute() {
  return (
    <div className="layout-container">
      <Header />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}