import { Award, Target, Users, Zap } from "lucide-react";

export function AboutSection() {
  const features = [
    {
      icon: Target,
      title: "Enfoque Claro",
      description: "Nos dedicamos a conectar talento con oportunidades de manera eficiente y transparente.",
    },
    {
      icon: Users,
      title: "Comunidad Global",
      description: "Una plataforma para profesionales de toda América Latina buscando crecer juntos.",
    },
    {
      icon: Zap,
      title: "Tecnología Moderna",
      description: "Herramientas avanzadas para simplificar tu búsqueda y mejorar tu perfil profesional.",
    },
    {
      icon: Award,
      title: "Oportunidades Verificadas",
      description: "Todas las empresas y empleos pasan por un proceso de verificación riguroso.",
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Quiénes Somos</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Jobsito es una plataforma integral diseñada para revolucionar la forma en que profesionales y empresas se
            conectan.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white">Nuestra Misión</h3>
            <p className="text-slate-400 leading-relaxed">
              Crear un ecosistema digital donde cada profesional pueda alcanzar su máximo potencial y donde cada empresa
              encuentre el talento que necesita para crecer.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-blue-900 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-400">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Para Candidatos</h4>
                  <p className="text-sm text-slate-400">
                    Acceso a miles de oportunidades laborales e internados con empresas de todo el mundo.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-purple-900 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-400">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Para Empresas</h4>
                  <p className="text-sm text-slate-400">
                    Herramientas avanzadas para reclutar, evaluar y gestionar tu equipo de trabajo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-900">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop"
              alt="Team collaboration"
              className="rounded-xl w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 bg-slate-800 rounded-xl border border-slate-700 hover:shadow-lg transition-shadow group"
              >
                <div className="w-12 h-12 rounded-lg bg-linear-to-br from-blue-900 to-purple-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Vision */}
        <div className="mt-16 p-8 bg-linear-to-r from-blue-900/30 to-purple-900/30 rounded-2xl border border-blue-900">
          <h3 className="text-2xl font-bold mb-4 text-white">Nuestra Visión</h3>
          <p className="text-slate-400 leading-relaxed">
            Ser la plataforma número uno en América Latina para conectar talento profesional con oportunidades de
            crecimiento, promoviendo la innovación, inclusión y el desarrollo económico de nuestras comunidades.
          </p>
        </div>
      </div>
    </section>
  );
}
