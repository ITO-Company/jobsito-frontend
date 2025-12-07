import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useInternshipStore } from '@/stores/internship.store'
import { useInternshipDetail } from '@/hooks/useInternship'
import { useMilestoneList } from '@/hooks/useMilestone'
import { Button } from '@/components/ui/button'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar"
import { ChevronDown, ChevronRight, LogOut, Home } from 'lucide-react'

export function InternSidebar() {
  const navigate = useNavigate()
  const storeInternshipId = useInternshipStore((state) => state.internshipId)
  const clearInternshipId = useInternshipStore((state) => state.clearInternshipId)
  
  const { internship, isLoading: loadingInternship, fetchInternship } = useInternshipDetail()
  const { milestones, isLoading: loadingMilestones, fetchMilestonesByInternship } = useMilestoneList()
  
  const [expandedMilestones, setExpandedMilestones] = useState<Set<string>>(new Set())

  // Obtener internship ID del store o directamente de localStorage
  const internshipId = storeInternshipId || (() => {
    try {
      const stored = localStorage.getItem('internship-store')
      if (stored) {
        const parsed = JSON.parse(stored)
        return parsed.internshipId
      }
    } catch (e) {
      // Error parsing localStorage
    }
    return null
  })()

  useEffect(() => {
    if (!internshipId) return

    fetchInternship(internshipId)
    fetchMilestonesByInternship(internshipId)
  }, [internshipId, fetchInternship, fetchMilestonesByInternship])

  const toggleMilestone = (milestoneId: string) => {
    const newExpanded = new Set(expandedMilestones)
    if (newExpanded.has(milestoneId)) {
      newExpanded.delete(milestoneId)
    } else {
      newExpanded.add(milestoneId)
    }
    setExpandedMilestones(newExpanded)
  }

  const handleLogout = () => {
    localStorage.removeItem('auth-token')
    clearInternshipId()
    navigate('/auth/intern-signin')
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div>
          <h2 className="font-bold mb-2">Mi Pasantía</h2>
          
          {loadingInternship ? (
            <p className="text-sm text-muted-foreground">Cargando...</p>
          ) : internship ? (
            <div>
              <p className="text-sm font-semibold truncate">
                {internship.job_posting?.title || 'Pasantía'}
              </p>
              <p className="text-xs text-muted-foreground">
                {internship.company_profile?.name || 'Empresa'}
              </p>
            </div>
          ) : null}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-0">
        {/* Navigation */}
        <div className="px-4 py-2 border-b">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/intern/internships/detail`)}
            className="w-full justify-start"
          >
            <Home size={16} className="mr-2" />
            Inicio
          </Button>
        </div>

        {/* Milestones */}
        <div className="p-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Hitos</h3>
          
          {loadingMilestones ? (
            <p className="text-sm text-muted-foreground">Cargando hitos...</p>
          ) : milestones.length > 0 ? (
            <div className="space-y-1">
              {milestones.map((milestone) => (
                <div key={milestone.id}>
                  <button
                    onClick={() => toggleMilestone(milestone.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-accent transition-colors"
                  >
                    {expandedMilestones.has(milestone.id) ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                    <span className="truncate">{milestone.title}</span>
                  </button>

                  {/* Milestone details */}
                  {expandedMilestones.has(milestone.id) && (
                    <div className="ml-4 mt-1 space-y-1 border-l pl-3">
                      <button
                        onClick={() => navigate(`/intern/internships/${internshipId}/milestones/${milestone.id}`)}
                        className="w-full text-left text-xs px-2 py-1 text-muted-foreground hover:bg-accent rounded transition-colors"
                      >
                        Ver Detalle
                      </button>
                      <div className="text-xs text-muted-foreground px-2 py-1">
                        Estado: <span className="text-foreground">{milestone.status}</span>
                      </div>
                      {milestone.due_date && (
                        <div className="text-xs text-muted-foreground px-2 py-1">
                          Vence: <span className="text-foreground">{new Date(milestone.due_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No hay hitos disponibles</p>
          )}
        </div>
      </SidebarContent>

      {/* Logout */}
      <SidebarFooter className="border-t">
        <Button
          variant="destructive"
          size="sm"
          onClick={handleLogout}
          className="w-full"
        >
          <LogOut size={16} className="mr-2" />
          Cerrar Sesión
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
