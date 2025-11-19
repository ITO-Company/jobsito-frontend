import { Briefcase, Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Producto: [
      { label: "Características", href: "#" },
      { label: "Precios", href: "#pricing" },
      { label: "Seguridad", href: "#" },
      { label: "Roadmap", href: "#" },
    ],
    Empresa: [
      { label: "Sobre Nosotros", href: "#about" },
      { label: "Blog", href: "#" },
      { label: "Prensa", href: "#" },
      { label: "Careers", href: "#" },
    ],
    Legal: [
      { label: "Privacidad", href: "#" },
      { label: "Términos", href: "#" },
      { label: "Cookies", href: "#" },
      { label: "Contacto", href: "#contact" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="bg-slate-900 dark:bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">Jobsito</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              La plataforma que conecta talento con oportunidades en América Latina.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-slate-400 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 text-white">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <p className="text-slate-400 text-sm">© {currentYear} Jobsito. Todos los derechos reservados.</p>
            <div className="flex gap-4 md:justify-end flex-wrap">
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                Política de Privacidad
              </a>
              <span className="text-slate-700">•</span>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                Términos de Servicio
              </a>
              <span className="text-slate-700">•</span>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                Política de Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
