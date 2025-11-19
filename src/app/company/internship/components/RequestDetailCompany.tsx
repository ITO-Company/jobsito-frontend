import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useRequestDetail, useRequestReview } from '@/hooks/useRequest'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, CheckCircle2, ChevronLeft } from 'lucide-react'
import { RequestReviewForm } from './RequestReviewForm'

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'Fecha inválida'
  const dateMatch = dateString.match(/(\d{4})-(\d{2})-(\d{2})/)
  if (dateMatch) {
    const [, year, month, day] = dateMatch
    return `${day}/${month}/${year}`
  }
  return 'Fecha inválida'
}

export function RequestDetailCompany() {
  const navigate = useNavigate()
  const { requestId } = useParams()
  const { request, isLoading, error, fetchRequest } = useRequestDetail()
  const { reviewRequest, isSubmitting: isReviewing } = useRequestReview()
  const [showReviewForm, setShowReviewForm] = useState(false)

  useEffect(() => {
    if (requestId) {
      fetchRequest(requestId)
    }
  }, [requestId])

  const handleReviewSuccess = async (status: string, comment: string) => {
    if (requestId) {
      const success = await reviewRequest(requestId, { status, company_comment: comment })
      if (success) {
        setShowReviewForm(false)
        fetchRequest(requestId)
      }
    }
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
    return (
      <div className="p-4 border border-destructive rounded text-destructive">
        {error}
      </div>
    )
  }

  if (isLoading) {
    return <p className="text-muted-foreground">Cargando request...</p>
  }

  if (!request) {
    return <p className="text-center py-8 text-muted-foreground">Request no encontrado</p>
  }

  const isPending = request.status?.toLowerCase() === 'pending'

  return (
    <div className="max-w-2xl mx-auto">
      <Button
        onClick={() => navigate(-1)}
        variant="ghost"
        size="sm"
        className="mb-4"
      >
        <ChevronLeft size={16} className="mr-2" />
        Atrás
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{request.title}</CardTitle>
            <span className={`text-xs px-3 py-1 rounded flex items-center gap-1 ${getStatusColor(request.status)}`}>
              {getStatusIcon(request.status)}
              {request.status}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-muted-foreground">Descripción</label>
            <p className="mt-2">{request.description}</p>
          </div>

          {request.company_comment && (
            <div>
              <label className="text-sm font-semibold text-muted-foreground">Comentario de Revisión</label>
              <p className="mt-2 p-3 bg-muted rounded">{request.company_comment}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <label className="text-sm font-semibold text-muted-foreground">Fecha de Creación</label>
              <p className="mt-1">{formatDate(request.created_at)}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground">Última Actualización</label>
              <p className="mt-1">{formatDate(request.updated_at)}</p>
            </div>
          </div>

          {isPending && !showReviewForm && (
            <div className="pt-4 border-t">
              <Button
                onClick={() => setShowReviewForm(true)}
                variant="default"
                size="sm"
              >
                Revisar Request
              </Button>
            </div>
          )}

          {showReviewForm && (
            <div className="pt-4 border-t">
              <RequestReviewForm
                onSubmit={handleReviewSuccess}
                onCancel={() => setShowReviewForm(false)}
                isLoading={isReviewing}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
