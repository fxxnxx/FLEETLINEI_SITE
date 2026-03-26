import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";

export function Root() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
