import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="p-6 text-center bg-gray-800 text-white mt-10">
        All rights reserved 2025 - Shortzyy
      </footer>
    </div>
  );
};

export default AppLayout;
