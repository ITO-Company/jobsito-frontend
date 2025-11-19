import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useIssueList } from '@/hooks/useIssue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, AlertCircle, CheckCircle2 } from 'lucide-react'
import { IssueForm } from './IssueForm'

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'Fecha inválida'
  const dateMatch = dateString.match(/(\d{4})-(\d{2})-(\d{2})/)
  if (dateMatch) {
    const [, year, month, day] = dateMatch
    return `${day}/${month}/${year}`
  }
  return 'Fecha inválida'
}

interface IssueListProps {
  milestoneId: string
}

export function IssueList({ milestoneId }: IssueListProps) {
  const navigate = useNavigate()
  const { issues, isLoading, error, fetchIssuesByMilestone } = useIssueList()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchIssuesByMilestone(milestoneId)
  }, [milestoneId])

  const handleSuccess = () => {
    setShowForm(false)
    setEditingId(null)
    fetchIssuesByMilestone(milestoneId)
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'resolved':
        return 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100'
      case 'open':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100'
      case 'in_progress':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    if (status?.toLowerCase() === 'resolved') {
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
        <h3 className="text-lg font-semibold">Issues</h3>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} size="sm" variant="default">
            + Crear Issue
          </Button>
        )}
      </div>

      {showForm && (
        <IssueForm
          milestoneId={milestoneId}
          onSuccess={handleSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {isLoading ? (
        <p className="text-muted-foreground">Cargando issues...</p>
      ) : issues.length > 0 ? (
        <div className="space-y-2">
          {issues.map((issue) => (
            <Card key={issue.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{issue.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${getStatusColor(issue.status)}`}>
                        {getStatusIcon(issue.status)}
                        {issue.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{issue.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar size={14} />
                      <span>Vence: {formatDate(issue.due_date)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Creado: {formatDate(issue.created_at)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigate(`/company/internships/${issue.milestone_id}/milestones/issues/${issue.id}`)}
                      variant="default"
                      size="sm"
                    >
                      Ver
                    </Button>
                    <Button
                      onClick={() => setEditingId(issue.id)}
                      variant="outline"
                      size="sm"
                    >
                      Editar
                    </Button>
                  </div>
                </div>
                {editingId === issue.id && (
                  <div className="mt-4 border-t pt-4">
                    <IssueForm
                      milestoneId={milestoneId}
                      issue={issue}
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
        <p className="text-center py-8 text-muted-foreground">No hay issues</p>
      )}
    </div>
  )
}
