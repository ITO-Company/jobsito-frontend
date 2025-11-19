import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useRequestList } from '@/hooks/useRequest'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { RequestFormSeeker } from './RequestFormSeeker'

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'Fecha inválida'
  const dateMatch = dateString.match(/(\d{4})-(\d{2})-(\d{2})/)
  if (dateMatch) {
    const [, year, month, day] = dateMatch
    return `${day}/${month}/${year}`
  }
  return 'Fecha inválida'
}

interface RequestListSeekerProps {
  issueId: string
}

export function RequestListSeeker({ issueId }: RequestListSeekerProps) {
  const navigate = useNavigate()
  const { requests, isLoading, error, fetchRequestsByIssue } = useRequestList()
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchRequestsByIssue(issueId)
  }, [issueId])

  const handleSuccess = () => {
    setShowForm(false)
    fetchRequestsByIssue(issueId)
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100'
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100'
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    if (status?.toLowerCase() === 'approved') {
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
        <h3 className="text-lg font-semibold">Requests</h3>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} size="sm" variant="default">
            + Crear Request
          </Button>
        )}
      </div>

      {showForm && (
        <RequestFormSeeker
          issueId={issueId}
          onSuccess={handleSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {isLoading ? (
        <p className="text-muted-foreground">Cargando requests...</p>
      ) : requests.length > 0 ? (
        <div className="space-y-2">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{request.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        {request.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
                    <p className="text-xs text-muted-foreground">Creado: {formatDate(request.created_at)}</p>
                  </div>
                  <Button
                    onClick={() => navigate(`/jobseeker/internships/requests/${request.id}`)}
                    variant="default"
                    size="sm"
                  >
                    Ver
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center py-8 text-muted-foreground">No hay requests</p>
      )}
    </div>
  )
}
