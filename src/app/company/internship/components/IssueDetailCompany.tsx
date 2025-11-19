import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useIssueDetail } from '@/hooks/useIssue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from 'lucide-react'

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'Fecha inválida'
  const dateMatch = dateString.match(/(\d{4})-(\d{2})-(\d{2})/)
  if (dateMatch) {
    const [, year, month, day] = dateMatch
    return `${day}/${month}/${year}`
  }
  return 'Fecha inválida'
}

export function IssueDetailCompany() {
  const { internshipId, milestoneId, issueId } = useParams()
  const navigate = useNavigate()
  const { issue, isLoading, error, fetchIssue } = useIssueDetail()

  useEffect(() => {
    if (issueId) {
      fetchIssue(issueId)
    }
  }, [issueId])

  if (isLoading) {
    return <p>Cargando issue...</p>
  }

  if (error) {
    return <div className="p-4 border border-destructive rounded text-destructive">{error}</div>
  }

  if (!issue) {
    return <p>Issue no encontrado</p>
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Detalle del Issue</h1>
        <div className="flex gap-2">
          <Button onClick={() => navigate(`/company/internships/${internshipId}/milestones/${milestoneId}`)} variant="outline">
            Volver
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{issue.title}</CardTitle>
              <p className="text-muted-foreground mt-2">Issue</p>
            </div>
            <span className={`text-sm px-3 py-1 rounded ${getStatusColor(issue.status)}`}>
              {issue.status}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Descripción */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Descripción</h3>
            <p className="text-sm">{issue.description}</p>
          </div>

          {/* Fechas */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Información</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Fecha de vencimiento</p>
                  <p className="font-medium">{formatDate(issue.due_date)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actualizado */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Historial</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Actualizado: {formatDate(issue.updated_at)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
