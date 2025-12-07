import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useRequestCreate } from '@/hooks/useRequest'
import { X } from 'lucide-react'

interface RequestFormSeekerProps {
  issueId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function RequestFormSeeker({ issueId, onSuccess, onCancel }: RequestFormSeekerProps) {
  const { createRequest, isSubmitting } = useRequestCreate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await createRequest({
        title: formData.title,
        description: formData.description,
        issue_id: issueId,
      })
      onSuccess?.()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg bg-muted/30">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Crear Revisión</h3>
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
          placeholder="Título de la revisión"
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
          placeholder="Descripción de la revisión"
          rows={3}
        />
      </div>

      <div className="flex gap-2 justify-end pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creando...' : 'Crear'}
        </Button>
      </div>
    </form>
  )
}
