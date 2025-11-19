import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useMilestoneDetail } from '@/hooks/useMilestone'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from 'lucide-react'

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'Fecha inválida'
  // Extrae solo la parte de la fecha: YYYY-MM-DD de cualquier formato ISO
  const dateMatch = dateString.match(/(\d{4})-(\d{2})-(\d{2})/)
  if (dateMatch) {
    const [, year, month, day] = dateMatch
    return `${day}/${month}/${year}`
  }
  return 'Fecha inválida'
}

export function MilestoneDetailSeeker() {
  const { internshipId, milestoneId } = useParams()
  const navigate = useNavigate()
  const { milestone, isLoading, error, fetchMilestone } = useMilestoneDetail()

  useEffect(() => {
    if (milestoneId) {
      fetchMilestone(milestoneId)
    }
  }, [milestoneId])

  console.log('Milestone:', milestone)

  if (isLoading) {
    return <p>Cargando milestone...</p>
  }

  if (error) {
    return <div className="p-4 border border-destructive rounded text-destructive">{error}</div>
  }

  if (!milestone) {
    return <p>Milestone no encontrado</p>
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100'
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100'
      case 'overdue':
        return 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Detalle del Milestone</h1>
        <Button onClick={() => navigate(`/job-seeker/internships/${internshipId}`)} variant="outline">
          Volver
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{milestone.title}</CardTitle>
              <p className="text-muted-foreground mt-2">Milestone</p>
            </div>
            <span className={`text-sm px-3 py-1 rounded ${getStatusColor(milestone.status)}`}>
              {milestone.status}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Descripción */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Descripción</h3>
            <p className="text-sm">{milestone.description}</p>
          </div>

          {/* Fecha de vencimiento */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Información</h3>
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Fecha de vencimiento</p>
                <p className="font-medium">{formatDate(milestone.due_date)}</p>
              </div>
            </div>
          </div>

          {/* Fechas de creación */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Historial</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Creado: {formatDate(milestone.created_at)}</p>
              <p>Actualizado: {formatDate(milestone.updated_at)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
