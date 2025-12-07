import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useMilestoneDetail } from '@/hooks/useMilestone'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, AlertCircle } from 'lucide-react'
import { IssueListSeeker } from './IssueListSeeker'

export function MilestoneDetailSeeker() {
  const { internshipId, milestoneId } = useParams()
  const navigate = useNavigate()
  const { milestone, isLoading, error, fetchMilestone } = useMilestoneDetail()

  useEffect(() => {
    if (milestoneId) {
      fetchMilestone(milestoneId)
    }
  }, [milestoneId])

  if (isLoading) return <p>Cargando hito...</p>
  if (error) return <div className="p-4 border border-destructive rounded text-destructive">{error}</div>
  if (!milestone) return <p>Hito no encontrado</p>

  const milestoneTitle = (milestone as any).title || (milestone as any).name

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100'
      case 'completed':
        return 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100'
      case 'delayed':
        return 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{milestoneTitle}</h1>
        <Button
          onClick={() => navigate(`/intern/internships/${internshipId}`)}
          variant="outline"
        >
          Volver
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>{milestoneTitle}</CardTitle>
            <span className={`text-sm px-3 py-1 rounded ${getStatusColor(milestone.status)}`}>
              {milestone.status}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {milestone.description && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Descripción</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{milestone.description}</p>
            </div>
          )}

          <div className="border-t pt-6">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Fecha de término</p>
                <p className="font-medium">{new Date(milestone.due_date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {milestone.status === 'delayed' && (
            <div className="border-t pt-6 flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded">
              <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900 dark:text-red-100">Este hito está retrasado</p>
                <p className="text-sm text-red-800 dark:text-red-200">Por favor, contacte con la empresa para actualizar el estado</p>
              </div>
            </div>
          )}

          <div className="border-t pt-6">
            <IssueListSeeker milestoneId={milestone.id} internshipId={internshipId || ''} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
