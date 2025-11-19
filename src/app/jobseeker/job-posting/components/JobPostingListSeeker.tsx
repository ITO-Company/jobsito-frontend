import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useJobPostingList } from '@/hooks/useJobPosting'
import { useJobPostingStore } from '@/stores/jobposting.store'
import { useSavedJobCreate } from '@/hooks/useSavedJob'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function JobPostingListSeeker() {
  const navigate = useNavigate()
  const { jobPostings, isLoading, error } = useJobPostingStore()
  const { fetchJobPostings } = useJobPostingList()
  const { createSavedJob, isSubmitting } = useSavedJobCreate()
  const [page, setPage] = useState(0)
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set())
  const [saveMessages, setSaveMessages] = useState<Record<string, string>>({})

  const limit = 10

  useEffect(() => {
    fetchJobPostings(limit, page * limit)
  }, [page, limit])

  const handleSaveJob = async (jobPostingId: string) => {
    try {
      await createSavedJob(jobPostingId)
      setSavedJobIds((prev) => new Set([...prev, jobPostingId]))
      setSaveMessages((prev) => ({ ...prev, [jobPostingId]: '✓ Guardado' }))
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => {
        setSaveMessages((prev) => {
          const newMessages = { ...prev }
          delete newMessages[jobPostingId]
          return newMessages
        })
      }, 3000)
    } catch (error: any) {
      // Si es error 409, marcar como ya guardado
      if (error.response?.status === 409) {
        setSavedJobIds((prev) => new Set([...prev, jobPostingId]))
        setSaveMessages((prev) => ({ ...prev, [jobPostingId]: 'Ya guardado' }))
      }
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Ofertas Laborales Disponibles</h2>
        <p className="text-muted-foreground">Explora todas las ofertas disponibles</p>
      </div>

      {error && <div className="p-4 border border-destructive rounded text-destructive">{error}</div>}

      {isLoading ? (
        <p>Cargando ofertas...</p>
      ) : jobPostings.length > 0 ? (
        <>
          <div className="space-y-4">
            {jobPostings.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer">
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
                    <Button
                      onClick={() => navigate(`/jobseeker/job-posting/${job.id}`)}
                      variant="default"
                      className="ml-4"
                    >
                      Ver Oferta
                    </Button>
                    <Button
                      onClick={() => handleSaveJob(job.id)}
                      variant={savedJobIds.has(job.id) ? 'secondary' : 'outline'}
                      disabled={isSubmitting || savedJobIds.has(job.id)}
                    >
                      {saveMessages[job.id] || (savedJobIds.has(job.id) ? 'Guardado' : 'Guardar')}
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
              disabled={jobPostings.length < limit}
              variant="outline"
            >
              Siguiente
            </Button>
          </div>
        </>
      ) : (
        <p className="text-center text-muted-foreground py-8">No hay ofertas disponibles</p>
      )}
    </div>
  )
}
