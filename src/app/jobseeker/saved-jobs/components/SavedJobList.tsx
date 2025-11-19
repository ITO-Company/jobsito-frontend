import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSavedJobList, useSavedJobDelete } from '@/hooks/useSavedJob'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function SavedJobList() {
  const navigate = useNavigate()
  const { savedJobs, isLoading, error, fetchMySavedJobs } = useSavedJobList()
  const { deleteSavedJob, isSubmitting: isDeleting } = useSavedJobDelete()
  const [page, setPage] = useState(0)

  const limit = 10

  useEffect(() => {
    fetchMySavedJobs(limit, page * limit)
  }, [page])

  const handleDeleteSavedJob = async (savedJobId: string) => {
    try {
      await deleteSavedJob(savedJobId)
      // Recargar la lista
      await fetchMySavedJobs(limit, page * limit)
    } catch (error) {
      console.error('Error al eliminar trabajo guardado:', error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Trabajos Guardados</h2>
          <p className="text-muted-foreground">Mis ofertas guardadas</p>
        </div>
        <Button onClick={() => navigate('/jobseeker/job-posting')} variant="outline">
          Ver más ofertas
        </Button>
      </div>

      {error && <div className="p-4 border border-destructive rounded text-destructive">{error}</div>}

      {isLoading ? (
        <p>Cargando trabajos guardados...</p>
      ) : savedJobs.length > 0 ? (
        <>
          <div className="space-y-4">
            {savedJobs.map((savedJob) => {
              const job = savedJob.job_posting
              return (
                <Card key={savedJob.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{job.location}</p>
                        <p className="text-sm mt-2 line-clamp-2">{job.description}</p>
                        <div className="mt-3 flex gap-2 flex-wrap">
                          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-2 py-1 rounded">
                            {job.work_type}
                          </span>
                          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 px-2 py-1 rounded">
                            {job.experience_level}
                          </span>
                          <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 px-2 py-1 rounded">
                            ${job.salary_min} - ${job.salary_max}
                          </span>
                        </div>
                        {job.tags && job.tags.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1">
                            {job.tags.slice(0, 3).map((tag: any) => (
                              <span
                                key={tag.id}
                                className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 px-2 py-1 rounded"
                              >
                                {tag.name}
                              </span>
                            ))}
                            {job.tags.length > 3 && (
                              <span className="text-xs text-muted-foreground">
                                +{job.tags.length - 3} más
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          onClick={() => navigate(`/jobseeker/job-posting/${job.id}`)}
                          variant="default"
                          size="sm"
                        >
                          Ver Oferta
                        </Button>
                        <Button
                          onClick={() => handleDeleteSavedJob(savedJob.id)}
                          variant="destructive"
                          size="sm"
                          disabled={isDeleting}
                        >
                          {isDeleting ? 'Eliminando...' : 'Eliminar'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
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
              disabled={savedJobs.length < limit}
              variant="outline"
            >
              Siguiente
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No tienes trabajos guardados aún</p>
          <Button
            onClick={() => navigate('/jobseeker/job-posting')}
            variant="default"
            className="mt-4"
          >
            Explorar Ofertas
          </Button>
        </div>
      )}
    </div>
  )
}
