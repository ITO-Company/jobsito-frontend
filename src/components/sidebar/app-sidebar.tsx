import { useLocation } from "react-router"
import {
  Briefcase,
  Building2,
  Tags,
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/stores/auth.store"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()
  const { user, logout } = useAuthStore()

  // Determinar si es jobseeker o company
  const isJobSeeker = location.pathname.includes('/jobseeker')

  // Rutas para Job Seeker
  const jobSeekerNav = [
    {
      title: "Mi Perfil",
      url: "/jobseeker/dashboard",
      icon: Briefcase,
      isActive: location.pathname.includes('/jobseeker/dashboard'),
    },
    {
      title: "Empresas",
      url: "/jobseeker/companies",
      icon: Building2,
      isActive: location.pathname.includes('/jobseeker/companies'),
    },
    {
      title: "Mis Habilidades",
      url: "/jobseeker/tags",
      icon: Tags,
      isActive: location.pathname.includes('/jobseeker/tags'),
    },
    {
      title: "Ofertas laborales",
      url: "/jobseeker/job-posting",
      icon: Tags,
      isActive: location.pathname.includes('/jobseeker/job-posting'),
    },
  ]

  // Rutas para Company
  const companyNav = [
    {
      title: "Mi Empresa",
      url: "/company/dashboard",
      icon: Building2,
      isActive: location.pathname.includes('/company/dashboard'),
    },
    {
      title: "Buscadores",
      url: "/company/seekers",
      icon: Briefcase,
      isActive: location.pathname.includes('/company/seekers'),
    },
    {
      title: "Mis ofertas",
      url: "/company/job-posting",
      icon: Briefcase,
      isActive: location.pathname.includes('/company/job-posting'),
    },
  ]

  const navItems = isJobSeeker ? jobSeekerNav : companyNav

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} onLogout={handleLogout} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
