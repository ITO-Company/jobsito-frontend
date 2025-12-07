import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useRequestDetail } from '@/hooks/useRequest'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, FileText } from 'lucide-react'

export function RequestDetailSeeker() {
  const { requestId } = useParams()
  const navigate = useNavigate()
  const { request, isLoading, error, fetchRequest } = useRequestDetail()

  useEffect(() => {
    if (requestId) {
      fetchRequest(requestId)
    }
  }, [requestId])

  if (isLoading) return <p>Cargando solicitud...</p>
  if (error) return <div className="p-4 border border-destructive rounded text-destructive">{error}</div>
  if (!request) return <p>Solicitud no encontrada</p>

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100'
      case 'approved':
        return 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100'
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Detalle de Solicitud</h1>
        <Button onClick={() => navigate('/intern/internships')} variant="outline">
          Volver
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <FileText size={24} className="text-muted-foreground" />
              <CardTitle>{request.title || 'Solicitud'}</CardTitle>
            </div>
            <span className={`text-sm px-3 py-1 rounded ${getStatusColor(request.status)}`}>
              {request.status}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {request.description && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Descripción</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{request.description}</p>
            </div>
          )}

          {request.created_at && (
            <div className="border-t pt-6">
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Fecha de solicitud</p>
                  <p className="font-medium">{new Date(request.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}

          {request.company_comment && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-2">Comentarios</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{request.company_comment}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
