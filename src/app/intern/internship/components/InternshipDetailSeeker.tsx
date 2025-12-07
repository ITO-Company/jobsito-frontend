import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useInternshipDetail } from '@/hooks/useInternship'
import { useInternshipStore } from '@/stores/internship.store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Briefcase, Building } from 'lucide-react'
import { MilestoneListSeeker } from './MilestoneListSeeker'

export function InternshipDetailSeeker() {
  const navigate = useNavigate()
  const storeInternshipId = useInternshipStore((state) => state.internshipId)
  const { internship, isLoading, error, fetchInternship } = useInternshipDetail()

  // Obtener el internship ID del store o directamente de localStorage
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
    if (!internshipId) {
      navigate('/intern/internships')
      return
    }

    fetchInternship(internshipId)
  }, [internshipId, fetchInternship, navigate])

  if (isLoading) {
    return <p>Cargando pasantía...</p>
  }

  if (error) {
    return <div className="p-4 border border-destructive rounded text-destructive">{error}</div>
  }

  if (!internship) {
    return <p>Pasantía no encontrada</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Detalle de Pasantía</h1>
        <Button onClick={() => navigate('/intern/internships')} variant="outline">
          Volver
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{internship.job_posting?.title || 'Oferta sin título'}</CardTitle>
              <p className="text-muted-foreground mt-2">Estado: </p>
            </div>
            <Badge variant="default">
              {internship.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Información de la Empresa */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Información de la Empresa</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Building size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Empresa</p>
                  <p className="font-medium">{internship.company_profile?.name || 'Sin nombre'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fechas */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Período</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Fecha de Inicio</p>
                  <p className="font-medium">{new Date(internship.start_date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Fecha de Término</p>
                  <p className="font-medium">{new Date(internship.end_date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detalles de la Oferta */}
          {internship.job_posting && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Detalles de la Oferta</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Descripción</p>
                  <p className="font-medium whitespace-pre-wrap">{internship.job_posting.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase size={18} className="text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Rango salarial</p>
                    <p className="font-medium">${internship.job_posting.salary_min} - ${internship.job_posting.salary_max}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hitos */}
          <div className="border-t pt-6">
            <MilestoneListSeeker internshipId={internship.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
