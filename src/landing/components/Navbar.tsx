import { useState } from "react";
import { useNavigate } from "react-router";
import { Menu, X, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSignIn = () => {
    navigate("/auth");
  };

  const handleSignUp = () => {
    navigate("/auth/signup");
  };

  const navItems = [
    { label: "Inicio", id: "hero" },
    { label: "Quiénes Somos", id: "about" },
    { label: "Planes", id: "pricing" },
    { label: "Contacto", id: "contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Jobsito
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-slate-300 hover:text-blue-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex gap-3">
            <Button
              variant="outline"
              onClick={handleSignUp}
              className="border-slate-600 text-slate-900 hover:bg-slate-800"
            >
              Registrarse
            </Button>
            <Button
              onClick={handleSignIn}
              className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Iniciar Sesión
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-300">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-800 rounded"
              >
                {item.label}
              </button>
            ))}
            <div className="flex gap-2 px-4">
              <Button
                variant="outline"
                className="flex-1 border-slate-600 text-slate-200 hover:bg-slate-800"
                onClick={handleSignUp}
              >
                Registrarse
              </Button>
              <Button className="flex-1 bg-linear-to-r from-blue-600 to-purple-600" onClick={handleSignIn}>
                Iniciar Sesión
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
