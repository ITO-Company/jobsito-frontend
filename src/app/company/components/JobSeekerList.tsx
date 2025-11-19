import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { jobSeekerService, type JobSeekerResponse } from '@/services/jobseeker.service'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function JobSeekerList() {
  const navigate = useNavigate()
  const [jobSeekers, setJobSeekers] = useState<JobSeekerResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)

  const limit = 10

  useEffect(() => {
    fetchJobSeekers()
  }, [page])

  const fetchJobSeekers = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await jobSeekerService.getAll(limit, page * limit)
      setJobSeekers(response.data.data)
      setTotal(response.data.total)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al cargar buscadores')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Buscadores de Empleo</CardTitle>
            <CardDescription>Encuentra y revisa perfiles de candidatos</CardDescription>
          </CardHeader>
        </Card>

        {isLoading && <p>Cargando...</p>}
        {error && <div className="mb-4 p-4 border border-destructive rounded">{error}</div>}

        {jobSeekers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {jobSeekers.map((seeker) => (
                <Card key={seeker.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{seeker.name}</CardTitle>
                    <CardDescription>{seeker.email}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {seeker.bio && <p className="text-sm">{seeker.bio}</p>}
                    {seeker.location && <p className="text-sm">📍 {seeker.location}</p>}
                    {seeker.skills && <p className="text-sm">💼 {seeker.skills}</p>}

                    <Button
                      onClick={() => navigate(`/company/seekers/${seeker.id}`)}
                      className="w-full"
                      variant="outline"
                    >
                      Ver Perfil
                    </Button>
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
              <span>
                Página {page + 1} de {Math.ceil(total / limit)}
              </span>
              <Button
                onClick={() => setPage(page + 1)}
                disabled={page >= Math.ceil(total / limit) - 1}
                variant="outline"
              >
                Siguiente
              </Button>
            </div>
          </>
        ) : (
          !isLoading && <p>No hay buscadores disponibles</p>
        )}
      </div>
    </div>
  )
}
