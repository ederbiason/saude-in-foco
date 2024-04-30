import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function App() {

  return (
    <div className="relative pb-20 min-h-dvh bg-slate-50">
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  )
}
