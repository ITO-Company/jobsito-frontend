import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { jobSeekerService, type JobSeekerResponse } from '@/services/jobseeker.service'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function JobSeekerDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [seeker, setSeeker] = useState<JobSeekerResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      fetchSeeker()
    }
  }, [id])

  const fetchSeeker = async () => {
    if (!id) return
    setIsLoading(true)
    setError(null)

    try {
      const response = await jobSeekerService.getById(id)
      setSeeker(response.data)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al cargar buscador')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <p className="p-6">Cargando...</p>
  if (error) return <p className="p-6 text-destructive">{error}</p>

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="mb-6"
        >
          ← Volver
        </Button>

        {seeker && (
          <Card>
            <CardHeader>
              <CardTitle>{seeker.name}</CardTitle>
              <CardDescription>{seeker.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {seeker.bio && (
                <div>
                  <p className="font-semibold">Biografía</p>
                  <p>{seeker.bio}</p>
                </div>
              )}

              {seeker.location && (
                <div>
                  <p className="font-semibold">Ubicación</p>
                  <p>{seeker.location}</p>
                </div>
              )}

              {seeker.phone && (
                <div>
                  <p className="font-semibold">Teléfono</p>
                  <p>{seeker.phone}</p>
                </div>
              )}

              {seeker.skills && (
                <div>
                  <p className="font-semibold">Habilidades</p>
                  <p>{seeker.skills}</p>
                </div>
              )}

              {seeker.experience && (
                <div>
                  <p className="font-semibold">Experiencia</p>
                  <p>{seeker.experience}</p>
                </div>
              )}

              {seeker.availability && (
                <div>
                  <p className="font-semibold">Disponibilidad</p>
                  <p>{seeker.availability}</p>
                </div>
              )}

              {seeker.cv_url && (
                <div>
                  <Button
                    onClick={() => window.open(seeker.cv_url)}
                    variant="outline"
                  >
                    Descargar CV
                  </Button>
                </div>
              )}

              {seeker.portfolio_url && (
                <div>
                  <Button
                    onClick={() => window.open(seeker.portfolio_url)}
                    variant="outline"
                  >
                    Ver Portafolio
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
