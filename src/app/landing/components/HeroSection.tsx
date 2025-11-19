import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase, TrendingUp } from "lucide-react";

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-40 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="px-4 py-2 bg-blue-900 text-blue-300 rounded-full text-sm font-semibold">
                  ✨ Conecta Oportunidades, Crece tu Carrera
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight ">
                <span className="text-blue-600">La plataforma de empleo que</span>
                <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {" "}
                  te mereces
                </span>
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed">
                Jobsito conecta empresas con los mejores talentos. Encuentra oportunidades laborales, internados y crea
                tu red profesional en una sola plataforma.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg h-12"
                onClick={() => scrollToSection("pricing")}
              >
                Empezar Ahora <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 dark:border-slate-700 rounded-lg h-12"
                onClick={() => scrollToSection("about")}
              >
                Más Información
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800">
              <div>
                <div className="text-3xl font-bold text-blue-400">1000+</div>
                <p className="text-sm text-slate-400">Empresas Activas</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">5000+</div>
                <p className="text-sm text-slate-400">Candidatos</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-400">500+</div>
                <p className="text-sm text-slate-400">Empleos</p>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative">
            <div className="bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 backdrop-blur-sm border border-blue-900">
              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-3 bg-blue-900 rounded-lg">
                    <Briefcase className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">Busca Empleos</h3>
                    <p className="text-sm text-slate-400">Encuentra tu próxima oportunidad</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-3 bg-purple-900 rounded-lg">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">Conecta</h3>
                    <p className="text-sm text-slate-400">Red profesional global</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-3 bg-pink-900 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-pink-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">Crece</h3>
                    <p className="text-sm text-slate-400">Desarrolla tu carrera profesional</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
