import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface RequestReviewFormProps {
  onSubmit: (status: string, comment: string) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function RequestReviewForm({ onSubmit, onCancel, isLoading = false }: RequestReviewFormProps) {
  const [status, setStatus] = useState('pending')
  const [comment, setComment] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(status, comment)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="status" className="text-sm font-semibold">
              Estado
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={isLoading}
              className="w-full mt-2 px-3 py-2 border border-input rounded-md bg-background text-foreground disabled:opacity-50"
            >
              <option value="pending">Pendiente</option>
              <option value="approved">Aprobado</option>
              <option value="rejected">Rechazado</option>
            </select>
          </div>

          <div>
            <label htmlFor="comment" className="text-sm font-semibold">
              Comentario
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={isLoading}
              placeholder="Escribe un comentario sobre la revisión..."
              rows={4}
              className="w-full mt-2 px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground disabled:opacity-50 resize-none"
            />
          </div>

          <div className="flex gap-2 justify-end pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              disabled={isLoading}
            >
              {isLoading ? 'Enviando...' : 'Enviar Revisión'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
