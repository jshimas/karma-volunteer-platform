import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "./ui/Toast/Toaster";

export default function Layout() {
  return (
    <div className="flex flex-col h-screen relative font-nunito">
      <Header />
      <div className="flex-1 flex justify-center">
        <Outlet />
      </div>
      {/* <Footer /> */}
      <Toaster />
    </div>
  );
}
