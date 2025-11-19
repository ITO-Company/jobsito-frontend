import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useMilestoneList } from '@/hooks/useMilestone'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, CheckCircle2, AlertCircle } from 'lucide-react'
import { MilestoneForm } from './MilestoneForm'

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

interface MilestoneListProps {
  internshipId: string
}

export function MilestoneList({ internshipId }: MilestoneListProps) {
  const navigate = useNavigate()
  const { milestones, isLoading, error, fetchMilestonesByInternship } = useMilestoneList()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchMilestonesByInternship(internshipId)
  }, [internshipId])

  const handleSuccess = () => {
    setShowForm(false)
    setEditingId(null)
    fetchMilestonesByInternship(internshipId)
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

  const getStatusIcon = (status: string) => {
    if (status?.toLowerCase() === 'completed') {
      return <CheckCircle2 size={16} />
    }
    return <AlertCircle size={16} />
  }

  if (error) {
    return <div className="p-4 border border-destructive rounded text-destructive">{error}</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Milestones</h3>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} size="sm" variant="default">
            + Crear Milestone
          </Button>
        )}
      </div>

      {showForm && (
        <MilestoneForm
          internshipId={internshipId}
          onSuccess={handleSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {isLoading ? (
        <p className="text-muted-foreground">Cargando milestones...</p>
      ) : milestones.length > 0 ? (
        <div className="space-y-2">
          {milestones.map((milestone) => (
            <Card key={milestone.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{milestone.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${getStatusColor(milestone.status)}`}>
                        {getStatusIcon(milestone.status)}
                        {milestone.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{milestone.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={14} />
                      <span>{formatDate(milestone.due_date)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigate(`/company/internships/${internshipId}/milestones/${milestone.id}`)}
                      variant="default"
                      size="sm"
                    >
                      Ver
                    </Button>
                    <Button
                      onClick={() => setEditingId(milestone.id)}
                      variant="outline"
                      size="sm"
                    >
                      Editar
                    </Button>
                  </div>
                </div>

                {editingId === milestone.id && (
                  <div className="mt-4 pt-4 border-t">
                    <MilestoneForm
                      internshipId={internshipId}
                      milestone={milestone}
                      onSuccess={handleSuccess}
                      onCancel={() => setEditingId(null)}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center py-8 text-muted-foreground">No hay milestones creados</p>
      )}
    </div>
  )
}
