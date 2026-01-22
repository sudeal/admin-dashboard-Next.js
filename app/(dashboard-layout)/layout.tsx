"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ThemeProvider } from "../contexts/ThemeContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    // Mobilde sidebar açıldığında collapsed'ı false yap
    if (!sidebarOpen) {
      setSidebarCollapsed(false);
    }
  };

  const toggleSidebarCollapsed = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <ThemeProvider>
      <main className="min-h-screen bg-white dark:bg-gray-900">
          <div className="ds-layout">
            <div
              className={`ds-sidebar-overlay ${sidebarOpen ? "is-active" : ""}`}
              onClick={closeSidebar}
            />

            <Sidebar isOpen={sidebarOpen} isCollapsed={sidebarCollapsed} />

            <section className="ds-main">
              <Header
                onMenuClick={toggleSidebar}
                onMenuClickDesktop={toggleSidebarCollapsed}
              />

              <div className="ds-content">{children}</div>
            </section>
          </div>
        </main>
      </ThemeProvider>
  );
}
