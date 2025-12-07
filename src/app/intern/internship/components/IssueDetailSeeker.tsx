import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useIssueDetail } from '@/hooks/useIssue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export function IssueDetailSeeker() {
  const { internshipId, issueId } = useParams()
  const navigate = useNavigate()
  const { issue, isLoading, error, fetchIssue } = useIssueDetail()

  useEffect(() => {
    if (issueId) {
      fetchIssue(issueId)
    }
  }, [issueId])

  if (isLoading) return <p>Cargando problema...</p>
  if (error) return <div className="p-4 border border-destructive rounded text-destructive">{error}</div>
  if (!issue) return <p>Problema no encontrado</p>

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{issue.title}</h1>
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
            <div className="flex items-center gap-2">
              <AlertCircle size={24} className="text-muted-foreground" />
              <CardTitle>{issue.title}</CardTitle>
            </div>
            <span className={`text-sm px-3 py-1 rounded ${getStatusColor(issue.status)}`}>
              {issue.status}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {issue.description && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Descripción</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{issue.description}</p>
            </div>
          )}

          <div className="border-t pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Estado</p>
              <p className="font-semibold capitalize">{issue.status}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
