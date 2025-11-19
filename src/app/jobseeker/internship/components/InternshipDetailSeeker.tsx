import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useInternshipDetail } from '@/hooks/useInternship'
import { MilestoneListSeeker } from './MilestoneListSeeker'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Briefcase, Building2 } from 'lucide-react'

export function InternshipDetailSeeker() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { internship, isLoading, error, fetchInternship } = useInternshipDetail()

  useEffect(() => {
    if (id) {
      fetchInternship(id)
    }
  }, [id])

  if (isLoading) {
    return <p>Cargando pasantía...</p>
  }

  if (error) {
    return <div className="p-4 border border-destructive rounded text-destructive">{error}</div>
  }

  if (!internship) {
    return <p>Pasantía no encontrada</p>
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100'
      case 'completed':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Detalle de Pasantía</h1>
        <Button onClick={() => navigate('/job-seeker/internships')} variant="outline">
          Volver
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{internship.job_posting?.title || 'Oferta sin título'}</CardTitle>
              <p className="text-muted-foreground mt-2">En</p>
            </div>
            <span className={`text-sm px-3 py-1 rounded ${getStatusColor(internship.status)}`}>
              {internship.status}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Información de la Empresa */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Información de la Empresa</h3>
            <div className="flex items-center gap-3">
              <Building2 size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Empresa</p>
                <p className="font-medium">{internship.company_profile?.name || 'Sin nombre'}</p>
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
                  <p className="text-sm text-muted-foreground">Fecha de Fin</p>
                  <p className="font-medium">{new Date(internship.end_date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Información del Puesto */}
          {internship.job_posting && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Información del Puesto</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Descripción</p>
                  <p className="text-sm">{internship.job_posting.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase size={18} className="text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Rango Salarial</p>
                    <p className="font-medium">${internship.job_posting.salary_min} - ${internship.job_posting.salary_max}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Milestones Section */}
      <Card>
        <CardHeader>
          <CardTitle>Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <MilestoneListSeeker internshipId={id || ''} />
        </CardContent>
      </Card>
    </div>
  )
}
