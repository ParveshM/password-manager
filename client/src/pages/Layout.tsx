import Navbar from "@/components/main/Navbar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="mt-14 md:mt-0">{<Outlet />}</main>
    </div>
  );
};

export default Layout;
