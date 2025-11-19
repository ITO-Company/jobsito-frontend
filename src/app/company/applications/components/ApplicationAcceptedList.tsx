import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAcceptedApplications } from '@/hooks/useApplication'
import { getStatusBadge } from '@/lib/applicationUtils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function ApplicationAcceptedList() {
  const navigate = useNavigate()
  const { applications, isLoading, error, fetchAcceptedApplications } = useAcceptedApplications()
  const [page, setPage] = useState(0)

  const limit = 10

  useEffect(() => {
    fetchAcceptedApplications(limit, page * limit)
  }, [page])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Aplicaciones Aceptadas</h2>
          <p className="text-muted-foreground">Candidatos aceptados</p>
        </div>
        <Button onClick={() => navigate('/company/job-posting')} variant="outline">
          Volver
        </Button>
      </div>

      {error && <div className="p-4 border border-destructive rounded text-destructive">{error}</div>}

      {isLoading ? (
        <p>Cargando aplicaciones...</p>
      ) : applications.length > 0 ? (
        <>
          <div className="space-y-4">
            {applications.map((app) => (
              <Card key={app.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{app.job_seeker?.name || 'Candidato'}</h3>
                      <p className="text-sm text-muted-foreground">{app.job_seeker?.email}</p>
                      <p className="text-sm mt-2">{app.cover_letter}</p>
                      <div className="mt-3 flex gap-2">
                        {(() => {
                          const badge = getStatusBadge('accepted')
                          return (
                            <span className={`text-xs px-2 py-1 rounded ${badge.className}`}>
                              {badge.label}
                            </span>
                          )
                        })()}
                        <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-2 py-1 rounded">
                          Salario Propuesto: ${app.proposed_salary}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Aceptada: {new Date(app.status_changed_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      onClick={() => navigate(`/company/applications/${app.id}`)}
                      variant="default"
                      size="sm"
                    >
                      Ver Detalle
                    </Button>
                  </div>
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
              disabled={applications.length < limit}
              variant="outline"
            >
              Siguiente
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No hay aplicaciones aceptadas</p>
        </div>
      )}
    </div>
  )
}
