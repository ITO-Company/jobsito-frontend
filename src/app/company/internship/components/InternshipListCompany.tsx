import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useInternshipListCompany } from '@/hooks/useInternship'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Briefcase } from 'lucide-react'

export function InternshipListCompany() {
  const navigate = useNavigate()
  const { internships, isLoading, error, fetchCompanyInternships } = useInternshipListCompany()
  const [page, setPage] = useState(0)

  const limit = 10

  useEffect(() => {
    fetchCompanyInternships(limit, page * limit)
  }, [page])

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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Mis Pasantías</h2>
          <p className="text-muted-foreground">Pasantías de tu empresa</p>
        </div>
        <Button onClick={() => navigate('/company')} variant="outline">
          Volver
        </Button>
      </div>

      {error && <div className="p-4 border border-destructive rounded text-destructive">{error}</div>}

      {isLoading ? (
        <p>Cargando pasantías...</p>
      ) : internships.length > 0 ? (
        <>
          <div className="space-y-4">
            {internships.map((internship) => (
              <Card key={internship.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle>{internship.job_posting?.title || 'Oferta sin título'}</CardTitle>
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(internship.status)}`}>
                          {internship.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{internship.job_seeker?.name || 'Pasante'}</p>
                    </div>
                    <Button
                      onClick={() => navigate(`/company/internships/${internship.id}`)}
                      variant="default"
                      size="sm"
                    >
                      Ver Detalle
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-muted-foreground" />
                      <div className="text-sm">
                        <p className="text-muted-foreground">Inicio</p>
                        <p>{new Date(internship.start_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-muted-foreground" />
                      <div className="text-sm">
                        <p className="text-muted-foreground">Fin</p>
                        <p>{new Date(internship.end_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {internship.job_posting && (
                    <div className="flex items-start gap-2 pt-2 border-t">
                      <Briefcase size={16} className="text-muted-foreground mt-1" />
                      <div className="text-sm flex-1">
                        <p className="text-muted-foreground">Rango salarial</p>
                        <p>${internship.job_posting.salary_min} - ${internship.job_posting.salary_max}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <Button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              variant="outline"
            >
              Anterior
            </Button>
            <span>Página {page + 1}</span>
            <Button
              onClick={() => setPage(page + 1)}
              disabled={internships.length < limit}
              variant="outline"
            >
              Siguiente
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No hay pasantías disponibles</p>
        </div>
      )}
    </div>
  )
}
