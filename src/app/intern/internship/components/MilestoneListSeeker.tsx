import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useMilestoneList } from '@/hooks/useMilestone'
import { type MilestoneResponse } from '@/services/milestone.service'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from 'lucide-react'

interface MilestoneListSeekerProps {
  internshipId: string
}

export function MilestoneListSeeker({ internshipId }: MilestoneListSeekerProps) {
  const navigate = useNavigate()
  const { milestones, isLoading, error, fetchMilestonesByInternship } = useMilestoneList()

  useEffect(() => {
    if (internshipId) {
      fetchMilestonesByInternship(internshipId)
    }
  }, [internshipId])

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

  if (isLoading) return <p>Cargando hitos...</p>
  if (error) return <div className="p-2 text-sm text-destructive">{error}</div>

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Hitos</h3>
      </div>

      {milestones.length > 0 ? (
        <div className="space-y-3">
          {milestones.map((milestone: MilestoneResponse) => (
            <Card key={milestone.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">{milestone.title}</CardTitle>
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(milestone.status)}`}>
                        {milestone.status}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => navigate(`/intern/internships/${internshipId}/milestones/${milestone.id}`)}
                    variant="ghost"
                    size="sm"
                  >
                    Ver Detalle
                  </Button>
                </div>
              </CardHeader>

              {milestone.description && (
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-muted-foreground" />
                    <span>Fecha: {new Date(milestone.due_date).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No hay hitos registrados</p>
      )}
    </div>
  )
}
