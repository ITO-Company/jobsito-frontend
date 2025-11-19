import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAcceptedApplications } from '@/hooks/useApplication'
import { getStatusBadge } from '@/lib/applicationUtils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'

export function ApplicationAcceptedList() {
  const navigate = useNavigate()
  const { applications, isLoading, error, fetchAcceptedApplications } = useAcceptedApplications()
  const [page, setPage] = useState(0)
  const [expandedPostings, setExpandedPostings] = useState<Set<string>>(new Set())

  const limit = 10

  useEffect(() => {
    fetchAcceptedApplications(limit, page * limit)
  }, [page])

  const togglePosting = (postingId: string) => {
    setExpandedPostings((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(postingId)) {
        newSet.delete(postingId)
      } else {
        newSet.add(postingId)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Aplicaciones Aceptadas</h2>
          <p className="text-muted-foreground">Ofertas y candidatos aceptados</p>
        </div>
        <Button onClick={() => navigate('/company/job-posting')} variant="outline">
          Volver
        </Button>
      </div>

      {error && <div className="p-4 border border-destructive rounded text-destructive">{error}</div>}

      {isLoading ? (
        <p>Cargando aplicaciones...</p>
      ) : applications && applications.length > 0 ? (
        <>
          <div className="space-y-4">
            {(applications as any[]).map((jobPosting: any) => {
              const hasAcceptedApplications = (jobPosting.applications || []).length > 0
              const isExpanded = expandedPostings.has(jobPosting.id)

              return (
                <Card key={jobPosting.id} className="overflow-hidden">
                  <CardHeader
                    className="pb-3 cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => togglePosting(jobPosting.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-xl">{jobPosting.title}</CardTitle>
                          <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                            {jobPosting.applications?.length || 0} candidato{(jobPosting.applications?.length || 0) !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Salario: ${jobPosting.salary_min} - ${jobPosting.salary_max}
                        </p>
                      </div>
                      <div className="text-muted-foreground">
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                  </CardHeader>

                  {isExpanded && hasAcceptedApplications && (
                    <CardContent className="pt-0 pb-6 border-t">
                      <div className="space-y-3 mt-4">
                        {jobPosting.applications.map((app: any) => (
                          <div key={app.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-semibold">{app.job_seeker?.name || 'Candidato'}</h4>
                                <p className="text-sm text-muted-foreground">{app.job_seeker?.email}</p>
                                <p className="text-sm mt-2">{app.cover_letter}</p>
                                <div className="mt-3 flex gap-2 flex-wrap">
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
                                  Aceptada: {app.status_changed_at ? new Date(app.status_changed_at).toLocaleDateString() : new Date(app.created_at).toLocaleDateString()}
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
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}

                  {isExpanded && !hasAcceptedApplications && (
                    <CardContent className="pt-4 pb-6 border-t text-center text-muted-foreground">
                      No hay candidatos aceptados para esta oferta
                    </CardContent>
                  )}
                </Card>
              )
            })}
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
