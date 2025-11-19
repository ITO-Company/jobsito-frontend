import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useMilestoneCreate, useMilestoneUpdate } from '@/hooks/useMilestone'
import { X } from 'lucide-react'

interface MilestoneFormProps {
  internshipId: string
  milestone?: any
  onSuccess?: () => void
  onCancel?: () => void
}

export function MilestoneForm({ internshipId, milestone, onSuccess, onCancel }: MilestoneFormProps) {
  const { createMilestone, isSubmitting: isCreating } = useMilestoneCreate()
  const { updateMilestone, isSubmitting: isUpdating } = useMilestoneUpdate()
  const [formData, setFormData] = useState({
    title: milestone?.title || '',
    description: milestone?.description || '',
    due_date: milestone?.dueDate ? new Date(milestone.dueDate).toISOString().split('T')[0] : '',
  })

  const isSubmitting = isCreating || isUpdating

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Convertir fecha a ISO string (agregar T00:00:00Z)
      const isoDate = `${formData.due_date}T00:00:00Z`

      if (milestone?.id) {
        await updateMilestone(milestone.id, {
          title: formData.title,
          description: formData.description,
          due_date: isoDate,
        })
      } else {
        await createMilestone({
          title: formData.title,
          description: formData.description,
          due_date: isoDate,
          intership_id: internshipId,
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
        <h3 className="text-lg font-semibold">{milestone?.id ? 'Editar' : 'Crear'} Milestone</h3>
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
          placeholder="Título del milestone"
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
          placeholder="Descripción del milestone"
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
          {isSubmitting ? 'Guardando...' : milestone?.id ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  )
}
