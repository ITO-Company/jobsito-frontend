import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useJobPostingDetail } from '@/hooks/useJobPosting'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function JobPostingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { jobPosting, isLoading, error, fetchJobPosting } = useJobPostingDetail()

  useEffect(() => {
    if (id) {
      fetchJobPosting(id)
    }
  }, [id])

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (error || !jobPosting) {
    return <div className="text-destructive">{error || 'No se encontró la oferta'}</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{jobPosting.title}</h2>
          <p className="text-muted-foreground">{jobPosting.location}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate(`/company/job-posting/${id}/edit`)} variant="outline">
            Editar
          </Button>
          <Button onClick={() => navigate(`/company/job-posting/${id}/tags`)} variant="outline">
            Asignar Tags
          </Button>
          <Button onClick={() => navigate('/company/job-posting')} variant="outline">
            Volver
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Descripción</h3>
            <p className="text-sm">{jobPosting.description}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Requisitos</h3>
            <p className="text-sm">{jobPosting.requirement}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold">Rango Salarial</p>
              <p className="text-sm">
                ${jobPosting.salary_min} - ${jobPosting.salary_max}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold">Tipo de Trabajo</p>
              <p className="text-sm">{jobPosting.work_type}</p>
            </div>

            <div>
              <p className="text-sm font-semibold">Nivel de Experiencia</p>
              <p className="text-sm">{jobPosting.experience_level}</p>
            </div>

            <div>
              <p className="text-sm font-semibold">Tipo de Contrato</p>
              <p className="text-sm">{jobPosting.contract_type}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Beneficios</h3>
            <p className="text-sm">{jobPosting.benefit}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold">¿Remoto?</p>
              <p className="text-sm">{jobPosting.is_remote === 'true' ? 'Sí' : 'No'}</p>
            </div>

            <div>
              <p className="text-sm font-semibold">¿Híbrido?</p>
              <p className="text-sm">{jobPosting.is_hibrid === 'true' ? 'Sí' : 'No'}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold">Estado</p>
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-2 py-1 rounded inline-block">
              {jobPosting.status}
            </span>
          </div>

          {jobPosting.tags && jobPosting.tags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Habilidades Requeridas</h3>
              <div className="flex flex-wrap gap-2">
                {jobPosting.tags.map((tag: any) => (
                  <span
                    key={tag.id}
                    className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 px-2 py-1 rounded"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
