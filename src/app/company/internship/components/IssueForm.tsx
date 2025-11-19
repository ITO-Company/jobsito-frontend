import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useIssueCreate, useIssueUpdate } from '@/hooks/useIssue'
import { X } from 'lucide-react'

interface IssueFormProps {
  milestoneId: string
  issue?: any
  onSuccess?: () => void
  onCancel?: () => void
}

export function IssueForm({ milestoneId, issue, onSuccess, onCancel }: IssueFormProps) {
  const { createIssue, isSubmitting: isCreating } = useIssueCreate()
  const { updateIssue, isSubmitting: isUpdating } = useIssueUpdate()
  const [formData, setFormData] = useState({
    title: issue?.title || '',
    description: issue?.description || '',
    due_date: issue?.due_date ? new Date(issue.due_date).toISOString().split('T')[0] : '',
  })

  const isSubmitting = isCreating || isUpdating

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Convertir fecha a ISO string
      const isoDate = `${formData.due_date}T00:00:00Z`

      if (issue?.id) {
        await updateIssue(issue.id, {
          title: formData.title,
          description: formData.description,
          due_date: isoDate,
        })
      } else {
        await createIssue({
          title: formData.title,
          description: formData.description,
          due_date: isoDate,
          milestone_id: milestoneId,
        })
      }
      onSuccess?.()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg bg-muted/30">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{issue?.id ? 'Editar' : 'Crear'} Issue</h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Título del issue"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción del issue"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="due_date">Fecha de vencimiento</Label>
        <Input
          id="due_date"
          name="due_date"
          type="date"
          value={formData.due_date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex gap-2 justify-end pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : issue?.id ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  )
}
