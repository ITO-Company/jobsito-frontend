import { Route, Routes } from "react-router"
import { useState } from "react"
import { InternSidebar } from "@/components/sidebar/intern-sidebar"
import { internshipSeekerRoutes } from "./internship/internship.route"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function InternRoute() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "w-64" : "w-0"} overflow-hidden`}>
        <InternSidebar isOpen={sidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center px-4 gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-400 hover:text-white"
          >
            <Menu size={20} />
          </Button>
          <h1 className="text-xl font-bold text-white">Sistema de Pasantías</h1>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-slate-900">
          <div className="max-w-7xl mx-auto p-6">
            <Routes>
              <Route path="/*" element={<Routes>{internshipSeekerRoutes}</Routes>} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}
