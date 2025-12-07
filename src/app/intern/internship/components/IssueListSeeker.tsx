import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useIssueList } from '@/hooks/useIssue'
import { type IssueResponse } from '@/services/issue.service'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

interface IssueListSeekerProps {
  milestoneId: string
  internshipId: string
}

export function IssueListSeeker({ milestoneId, internshipId }: IssueListSeekerProps) {
  const navigate = useNavigate()
  const { issues, isLoading, error, fetchIssuesByMilestone } = useIssueList()

  useEffect(() => {
    if (milestoneId) {
      fetchIssuesByMilestone(milestoneId)
    }
  }, [milestoneId])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100'
      case 'in_progress':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100'
      case 'resolved':
        return 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
    }
  }

  if (isLoading) return <p>Cargando problemas...</p>
  if (error) return <div className="p-2 text-sm text-destructive">{error}</div>

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Problemas / Incidencias</h3>
      </div>

      {issues.length > 0 ? (
        <div className="space-y-3">
          {issues.map((issue: IssueResponse) => (
            <Card key={issue.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <AlertCircle size={18} className="text-muted-foreground" />
                      <CardTitle className="text-base">{issue.title}</CardTitle>
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(issue.status)}`}>
                        {issue.status}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => navigate(`/intern/internships/${internshipId}/milestones/issues/${issue.id}`)}
                    variant="ghost"
                    size="sm"
                  >
                    Ver Detalle
                  </Button>
                </div>
              </CardHeader>

              {issue.description && (
                <CardContent>
                  <p className="text-sm text-muted-foreground">{issue.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No hay problemas registrados</p>
      )}
    </div>
  )
}
