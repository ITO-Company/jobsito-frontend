import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useIssueDetail } from '@/hooks/useIssue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle } from 'lucide-react'
import { RequestFormSeeker } from './RequestFormSeeker'
import { RequestListSeeker } from './RequestListSeeker'

export function IssueDetailSeeker() {
  const { internshipId, issueId } = useParams()
  const navigate = useNavigate()
  const { issue, isLoading, error, fetchIssue } = useIssueDetail()
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (issueId) {
      fetchIssue(issueId)
    }
  }, [issueId])

  if (isLoading) return <p>Cargando problema...</p>
  if (error) return <div className="p-4 border border-destructive rounded text-destructive">{error}</div>
  if (!issue) return <p>Problema no encontrado</p>

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
            <Badge variant="default">{issue.status}</Badge>
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

          {/* Formulario para crear request */}
          <div className="border-t pt-6">
            {!showForm ? (
              <Button onClick={() => setShowForm(true)} className="w-full">
                Crear Revisión
              </Button>
            ) : (
              issueId && (
                <RequestFormSeeker
                  issueId={issueId}
                  onSuccess={() => {
                    setShowForm(false)
                    fetchIssue(issueId)
                  }}
                  onCancel={() => setShowForm(false)}
                />
              )
            )}
          </div>

          {/* Lista de requests */}
          <div className="border-t pt-6">
            {issueId && <RequestListSeeker issueId={issueId} />}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
