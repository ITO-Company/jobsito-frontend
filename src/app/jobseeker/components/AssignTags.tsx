import { useEffect, useState } from 'react'
import { useGlobalTags, useJobSeekerTags } from '@/hooks/useJobSeekerTags'
import { useJobSeekerProfile } from '@/hooks/useJobSeekerProfile'
import { useGlobalTagsStore } from '@/stores/globaltags.store'
import { useJobSeekerStore } from '@/stores/jobseeker.store'
import type { GlobalTagResponse } from '@/services/types/responses'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function AssignTags() {
  const { tags, isLoading, error } = useGlobalTagsStore()
  const { jobSeeker } = useJobSeekerStore()
  const { fetchTags } = useGlobalTags()
  const { addTag, removeTag, isSubmitting } = useJobSeekerTags()
  const { fetchProfile } = useJobSeekerProfile()
  const [proficiency, setProficiency] = useState<{ [key: string]: string }>({})
  const [page, setPage] = useState(0)

  const limit = 20

  // Cargar tags globales y perfil del jobseeker al montar
  useEffect(() => {
    fetchProfile()
    fetchTags(limit, page * limit)
  }, [page, limit])

  // Mapear las tags asignadas desde jobSeeker.tags
  const assignedTagIds = new Set(jobSeeker?.tags?.map((tag) => tag.global_tag.id) || [])
  
  // Mapear proficiency levels desde jobSeeker.tags
  useEffect(() => {
    if (jobSeeker?.tags) {
      const newProficiency: { [key: string]: string } = {}
      jobSeeker.tags.forEach((tag) => {
        newProficiency[tag.global_tag.id] = tag.proficiency_level
      })
      setProficiency(newProficiency)
    }
  }, [jobSeeker?.tags])

  const handleAddTag = async (tagId: string) => {
    try {
      const prof = proficiency[tagId] || ''
      await addTag(tagId, prof)
    } catch (error) {
      console.error('Error al agregar tag:', error)
    }
  }

  const handleRemoveTag = async (tagId: string) => {
    try {
      await removeTag(tagId)
    } catch (error) {
      console.error('Error al remover tag:', error)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Asignar Habilidades</h2>
        <p className="text-muted-foreground">Agrega tus habilidades y define tu nivel de proficiencia</p>
      </div>

      {error && <div className="p-4 border border-destructive rounded text-destructive">{error}</div>}

      {jobSeeker?.tags && jobSeeker.tags.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Tus Habilidades Asignadas</h3>
          <div className="flex flex-wrap gap-2">
            {jobSeeker.tags.map((tag) => (
              <div
                key={tag.id}
                className="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag.global_tag.name}
                <span className="ml-1 text-xs opacity-75">({tag.proficiency_level})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {isLoading ? (
        <p>Cargando habilidades...</p>
      ) : tags.length > 0 ? (
        <>
          <div className="space-y-4">
            {tags.map((tag: GlobalTagResponse) => {
              const isAssigned = assignedTagIds.has(tag.id)
              return (
                <Card key={tag.id} className={isAssigned ? 'border-green-500 bg-green-50 dark:bg-green-950' : ''}>
                  <CardContent className="pt-6 flex justify-between items-center">
                    <div className="flex-1">
                      <p className="font-semibold">{tag.name}</p>
                      <p className="text-sm text-muted-foreground">{tag.category}</p>

                      {isAssigned && (
                        <div className="mt-3">
                          <Select
                            value={proficiency[tag.id] || ''}
                            onValueChange={(value) =>
                              setProficiency({ ...proficiency, [tag.id]: value })
                            }
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue placeholder="Seleccionar nivel" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Básico">Básico</SelectItem>
                              <SelectItem value="Intermedio">Intermedio</SelectItem>
                              <SelectItem value="Avanzado">Avanzado</SelectItem>
                              <SelectItem value="Experto">Experto</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    {!isAssigned ? (
                      <Button
                        onClick={() => handleAddTag(tag.id)}
                        disabled={isSubmitting}
                        variant="default"
                        className="ml-4"
                      >
                        Agregar
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleRemoveTag(tag.id)}
                        disabled={isSubmitting}
                        variant="destructive"
                        className="ml-4"
                      >
                        Remover
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="flex justify-between items-center">
            <Button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              variant="outline"
            >
              Anterior
            </Button>
            <span>Página {page + 1}</span>
            <Button
              onClick={() => setPage(page + 1)}
              disabled={tags.length < limit}
              variant="outline"
            >
              Siguiente
            </Button>
          </div>
        </>
      ) : (
        <p>No hay habilidades disponibles</p>
      )}
    </div>
  )
}
