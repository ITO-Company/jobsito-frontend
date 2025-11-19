import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PricingSection() {
  const plans = [
    {
      name: "Candidato",
      description: "Para profesionales en busca de oportunidades",
      price: "Gratis",
      period: "",
      popular: false,
      features: [
        "Perfil profesional ilimitado",
        "Búsqueda de empleos",
        "Candidaturas ilimitadas",
        "Acceso a internados",
        "Conexión con empresas",
        "Chat con empresas",
      ],
      cta: "Crear Cuenta",
      color: "from-blue-600 to-blue-700",
    },
    {
      name: "Candidato Premium",
      description: "Para candidatos profesionales avanzados",
      price: "$9.99",
      period: "al mes",
      popular: true,
      features: [
        "Todo lo del plan básico",
        "Perfil destacado",
        "Análisis de perfil avanzado",
        "Recomendaciones personalizadas",
        "Acceso prioritario a empleos nuevos",
        "Soporte prioritario",
        "Certificados profesionales",
        "Bolsa de recomendaciones",
      ],
      cta: "Actualizar Plan",
      color: "from-purple-600 to-pink-600",
    },
    {
      name: "Empresa",
      description: "Para empresas buscando talento",
      price: "Personalizado",
      period: "",
      popular: false,
      features: [
        "Publicación de empleos",
        "Búsqueda de candidatos",
        "Gestión de aplicaciones",
        "Panel de control avanzado",
        "Reportes y analytics",
        "Integración con RRHH",
        "Soporte dedicado",
        "Formación del equipo",
      ],
      cta: "Contactar Ventas",
      color: "from-emerald-600 to-teal-600",
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Planes de Suscripción</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades y comienza a conectar con las mejores oportunidades.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border transition-all duration-300 overflow-hidden group ${
                plan.popular ? "border-2 border-purple-500 shadow-2xl md:scale-105" : "border-slate-700"
              } bg-slate-800 hover:shadow-xl`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="px-4 py-1 bg-linear-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-full">
                    MÁS POPULAR
                  </span>
                </div>
              )}

              {/* Gradient Background */}
              <div
                className={`absolute top-0 right-0 w-40 h-40 bg-linear-to-br ${plan.color} opacity-0 group-hover:opacity-5 transition-opacity rounded-full -mr-20 -mt-20`}
              ></div>

              <div className="relative p-8">
                {/* Plan Name and Description */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                  <p className="text-sm text-slate-400">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-5xl font-bold bg-linear-to-r ${plan.color} bg-clip-text text-transparent`}>
                      {plan.price}
                    </span>
                    {plan.period && <span className="text-slate-400">{plan.period}</span>}
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full mb-8 h-11 font-semibold rounded-lg transition-all ${
                    plan.popular
                      ? `bg-linear-to-r ${plan.color} text-white hover:shadow-lg hover:scale-105`
                      : "border border-slate-600 text-white hover:bg-slate-700"
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>

                {/* Features List */}
                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex gap-3">
                      <Check
                        className={`w-5 h-5 shrink-0 mt-0.5 ${plan.popular ? "text-purple-400" : "text-slate-500"}`}
                      />
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Text */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 mb-4">¿No estás seguro cuál elegir?</p>
          <Button variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800">
            Ver Comparación Detallada
          </Button>
        </div>
      </div>
    </section>
  );
}
